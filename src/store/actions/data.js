import firebase, { database } from 'api/index';

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const UPDATE_DATA = 'UPDATE_DATA';
export const SET_ACTIVE_NOTE_ID = 'SET_ACTIVE_NOTE_ID';
export const CREATE_NEW_NOTE = 'CREATE_NEW_NOTE';
export const SYNC_UPDATES_WITH_SERVER = 'SYNC_UPDATES_WITH_SERVER';
export const SYNC_UPDATES_WITH_SERVER_IMMEDIATELY =
    'SYNC_UPDATES_WITH_SERVER_IMMEDIATELY';

export const fetchDataStart = () => ({
    type: FETCH_DATA_START,
});

export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    payload: error,
});

export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});

export const setActiveNoteId = (id) => ({
    type: SET_ACTIVE_NOTE_ID,
    payload: id,
});

export const setDefaultActiveNoteId = () => async (dispatch, getState) => {
    const allNotes = getState().data.data;
    const currentRoute = getState().view.route;
    const filtredDataBasedOnRoute = allNotes
        .filter((note) => {
            if (currentRoute === 'all') {
                return !note.trash;
            } else if (currentRoute === 'trash') {
                return note.trash;
            } else return false;
        })
        .sort((note) => (note.pinned ? -1 : 1));
    dispatch(
        setActiveNoteId(filtredDataBasedOnRoute[0] ? filtredDataBasedOnRoute[0].id : ''),
    );
};

export const fetchData = () => async (dispatch) => {
    dispatch(fetchDataStart());

    const uid = firebase.auth().currentUser.uid;
    try {
        const notes = [];
        await database
            .collection('users')
            .doc(uid)
            .collection('notes')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { text, pinned, trash } = doc.data();
                    notes.push({ text, pinned, trash, id: doc.id });
                });
            });
        dispatch(fetchDataSuccess(notes));
        dispatch(setDefaultActiveNoteId());
    } catch (error) {
        dispatch(fetchDataError(error));
    }
};

export const updateNotes = (updatedNote) => async (dispatch, getState) => {
    const allNotes = getState().data.data;
    const updatedNotes = allNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
    );
    dispatch({ type: UPDATE_DATA, payload: updatedNotes });
};

export const syncUpdatesWithServer = (note, difference) => ({
    type: SYNC_UPDATES_WITH_SERVER,
    payload: { note, difference },
});

export const syncUpdatesWithServerImmediately = (note, difference) => ({
    type: SYNC_UPDATES_WITH_SERVER_IMMEDIATELY,
    payload: { note, difference },
});

export const updateNoteWithDebounce = (note, difference) => async (dispatch) => {
    const updatedNote = { ...note, ...difference };
    dispatch(updateNotes(updatedNote));
    dispatch(syncUpdatesWithServer(note, difference));
};

export const updateNoteImmediately = (note, difference) => async (dispatch) => {
    const updatedNote = { ...note, ...difference };
    dispatch(updateNotes(updatedNote));
    dispatch(syncUpdatesWithServerImmediately(note, difference));
};

export const pinNote = (note) => async (dispatch) => {
    const difference = { pinned: !note.pinned };
    dispatch(updateNoteImmediately(note, difference));
};

export const updateNoteText = (value) => async (dispatch, getState) => {
    const { activeNoteId, data } = getState().data;
    const note = data.find((note) => note.id === activeNoteId);
    if (!note || value === note.text) return;
    const difference = { text: value };
    dispatch(updateNoteWithDebounce(note, difference));
};

const setNoteIsInTrash = (value) => async (dispatch, getState) => {
    const { activeNoteId, data } = getState().data;
    const note = data.find((note) => note.id === activeNoteId);
    const difference = { trash: value };
    dispatch(updateNoteImmediately(note, difference));
    dispatch(setDefaultActiveNoteId());
};

export const sendNoteToTrash = () => setNoteIsInTrash(true);
export const restoreNoteFromTrash = () => setNoteIsInTrash(false);

export const createNewNote = () => async (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const newNote = {
        text: '',
        pinned: false,
        trash: false,
        author: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    database
        .collection('users')
        .doc(uid)
        .collection('notes')
        .add(newNote)
        .then((docRef) => {
            dispatch({ type: CREATE_NEW_NOTE, payload: { ...newNote, id: docRef.id } });
            dispatch(setActiveNoteId(docRef.id));
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
};
