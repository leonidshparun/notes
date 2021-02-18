import { addNoteTag, createNote, deleteNote, fetchNotes, removeNoteTag } from 'api/index';

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const UPDATE_DATA = 'UPDATE_DATA';
export const SET_ACTIVE_NOTE_DATA = 'SET_ACTIVE_NOTE_DATA';
export const CREATE_NEW_NOTE = 'CREATE_NEW_NOTE';
export const SYNC_UPDATES_WITH_SERVER = 'SYNC_UPDATES_WITH_SERVER';
export const SYNC_UPDATES_WITH_SERVER_IMMEDIATELY =
    'SYNC_UPDATES_WITH_SERVER_IMMEDIATELY';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_GLOBAL_TAGS = 'UPDATE_GLOBAL_TAGS';

export const fetchDataStart = () => ({
    type: FETCH_DATA_START,
});

export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    payload: error,
});

export const fetchDataSuccess = (data) => async (dispatch) => {
    dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data,
    });
    dispatch({
        type: UPDATE_GLOBAL_TAGS,
        payload: data.map((note) => note.tags).flat(),
    });
};

export const setActiveNoteData = (data) => ({
    type: SET_ACTIVE_NOTE_DATA,
    payload: data,
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
        setActiveNoteData(filtredDataBasedOnRoute[0] ? filtredDataBasedOnRoute[0] : ''),
    );
};

export const fetchData = () => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const notes = await fetchNotes();
        dispatch(fetchDataSuccess(notes));
        dispatch(setDefaultActiveNoteId());
    } catch (error) {
        dispatch(fetchDataError(error.message));
    }
};

export const updateNotes = (updatedNote) => async (dispatch, getState) => {
    const allNotes = getState().data.data;
    const updatedNotes = allNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
    );
    dispatch({ type: UPDATE_DATA, payload: updatedNotes });
    dispatch({ type: UPDATE_NOTE, payload: updatedNote });
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
    const { activeNote } = getState().data;
    if (value === activeNote.text) return;
    const difference = { text: value };
    dispatch(updateNoteWithDebounce(activeNote, difference));
};

const setNoteIsInTrash = (value) => async (dispatch, getState) => {
    const { activeNote } = getState().data;
    const difference = { trash: value };
    dispatch(updateNoteImmediately(activeNote, difference));
    dispatch(setDefaultActiveNoteId());
};

export const sendNoteToTrash = () => setNoteIsInTrash(true);
export const restoreNoteFromTrash = () => setNoteIsInTrash(false);

export const createNewNote = () => async (dispatch) =>
    createNote((docRef, newNote) => {
        dispatch({ type: CREATE_NEW_NOTE, payload: { ...newNote, id: docRef.id } });
        dispatch(setActiveNoteData({ ...newNote, id: docRef.id }));
    });

export const deleteNoteForever = () => (dispatch, getState) => {
    const { activeNote } = getState().data;
    deleteNote(activeNote, () => {
        dispatch({ type: DELETE_NOTE, payload: activeNote.id });
        dispatch(setDefaultActiveNoteId());
    });
};

export const addTag = (noteId, tag) => (dispatch, getState) => {
    addNoteTag(noteId, tag, () => {
        const { activeNote, globalTags } = getState().data;
        const difference = { tags: [...new Set([...activeNote.tags, tag])] };
        dispatch(updateNotes({ ...activeNote, ...difference }));
        dispatch({
            type: UPDATE_GLOBAL_TAGS,
            payload: [...globalTags, tag],
        });
    });
};

export const removeTag = (noteId, tag) => (dispatch, getState) => {
    removeNoteTag(noteId, tag, () => {
        const { activeNote } = getState().data;
        const difference = { tags: [...activeNote.tags.filter((_tag) => tag !== _tag)] };
        dispatch(updateNotes({ ...activeNote, ...difference }));

        const { data } = getState().data;
        dispatch({
            type: UPDATE_GLOBAL_TAGS,
            payload: data.map((note) => note.tags).flat(),
        });
    });
};

export const removeNoteGlobalTag = (note, tag) => (dispatch, getState) => {
    removeNoteTag(note.id, tag, () => {
        const difference = { tags: [...note.tags.filter((_tag) => tag !== _tag)] };
        dispatch(updateNotes({ ...note, ...difference }));
        const { data } = getState().data;
        dispatch({
            type: UPDATE_GLOBAL_TAGS,
            payload: data.map((note) => note.tags).flat(),
        });
    });
};

export const removeGlobalTag = (tag) => (dispatch, getState) => {
    const { data } = getState().data;
    const notesWithTag = data.filter((note) => note.tags.includes(tag));
    Promise.all(
        notesWithTag.map(async (note) => await dispatch(removeNoteGlobalTag(note, tag))),
    ).then(() => console.log('deleted'));
};
