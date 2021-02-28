import {
    addNoteTagDB,
    createNoteDB,
    deleteNoteDB,
    fetchNotesDB,
    getTimestamp,
    removeNoteTagDB,
} from 'api/index';
import { combinedFilter, combinedSort } from 'config/list.config';

export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const UPDATE_NOTE_DATA = 'UPDATE_NOTE_DATA';
export const SET_ACTIVE_NOTE_ID = 'SET_ACTIVE_NOTE_ID';
export const CREATE_NEW_NOTE = 'CREATE_NEW_NOTE';
export const SYNC_UPDATES_WITH_SERVER = 'SYNC_UPDATES_WITH_SERVER';
export const SYNC_UPDATES_WITH_SERVER_IMMEDIATELY =
    'SYNC_UPDATES_WITH_SERVER_IMMEDIATELY';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_GLOBAL_TAGS = 'UPDATE_GLOBAL_TAGS';
export const SET_NOTE_ID_LIST = 'SET_NOTE_ID_LIST';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const UPDATE_TAG_SELECTION = 'UPDATE_TAG_SELECTION';

export const refreshGlobalTags = (data) => ({
    type: UPDATE_GLOBAL_TAGS,
    payload: Object.values(data)
        .map((note) => note.tags)
        .flat(),
});

export const fetchDataStart = () => ({ type: FETCH_DATA_START });

export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    payload: error,
});

export const fetchDataSuccess = (data) => (dispatch) => {
    dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
    dispatch(refreshGlobalTags(data));
};

export const setActiveNoteId = (id) => ({
    type: SET_ACTIVE_NOTE_ID,
    payload: id,
});

export const setDefaultActiveNote = () => async (dispatch, getState) => {
    const allNotes = getState().data.data;
    const currentRoute = getState().view.route;
    const { sortOption, searchQuery, tags } = getState().data.selection;
    const filterAndSortedNotes = Object.values(allNotes)
        .filter(combinedFilter(currentRoute, searchQuery, tags))
        .sort(combinedSort(sortOption));
    dispatch(setActiveNoteId(filterAndSortedNotes[0]?.id || null));
};

export const setNeighborActiveNote = (noteId) => async (dispatch, getState) => {
    const allNotes = getState().data.data;
    const currentRoute = getState().view.route;
    const { sortOption, searchQuery, tags } = getState().data.selection;
    const filterAndSortedNotes = Object.values(allNotes)
        .filter(combinedFilter(currentRoute, searchQuery, tags))
        .sort(combinedSort(sortOption));
    const currentNoteIdx = filterAndSortedNotes.findIndex((item) => item.id === noteId);
    let nextNoteId = '';
    if (filterAndSortedNotes[currentNoteIdx + 1]) {
        nextNoteId = filterAndSortedNotes[currentNoteIdx + 1].id;
    } else if (filterAndSortedNotes[currentNoteIdx - 1]) {
        nextNoteId = filterAndSortedNotes[currentNoteIdx - 1].id;
    } else nextNoteId = null;

    dispatch(setActiveNoteId(nextNoteId));
};

export const fetchData = () => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const notes = await fetchNotesDB();
        const normalized = {};
        notes.forEach((note) => (normalized[note.id] = note));
        return dispatch(fetchDataSuccess(normalized));
    } catch (error) {
        return dispatch(fetchDataError(error.message));
    }
};

export const updateNoteData = (updatedNote) => ({
    type: UPDATE_NOTE_DATA,
    payload: updatedNote,
});

const syncUpdateType = (isDebounced) => (noteId, difference) => ({
    type: isDebounced ? SYNC_UPDATES_WITH_SERVER : SYNC_UPDATES_WITH_SERVER_IMMEDIATELY,
    payload: { noteId, difference },
});

export const updateNote = (noteId, difference, debounce) => async (
    dispatch,
    getState,
) => {
    const syncWithServerType = syncUpdateType(debounce);
    const noteToUpdate = getState().data.data[noteId];
    dispatch(syncWithServerType(noteId, difference));
    dispatch(
        updateNoteData({ ...noteToUpdate, ...difference, lastUpdate: getTimestamp() }),
    );
};

export const pinNote = (noteId, value) => async (dispatch) => {
    const difference = { pinned: !value };
    dispatch(updateNote(noteId, difference, false));
};

export const updateNoteText = (value) => async (dispatch, getState) => {
    const { activeNoteId, data } = getState().data;
    if (value === data[activeNoteId].text) return;
    const difference = { text: value };
    dispatch(updateNote(activeNoteId, difference, true));
};

const setNoteIsInTrash = (value) => async (dispatch, getState) => {
    const { activeNoteId } = getState().data;
    dispatch(setNeighborActiveNote(activeNoteId));
    const difference = { trash: value };
    dispatch(updateNote(activeNoteId, difference, false));
};

export const sendNoteToTrash = () => setNoteIsInTrash(true);
export const restoreNoteFromTrash = () => setNoteIsInTrash(false);

export const createNewNote = () => (dispatch) =>
    createNoteDB((newNote) => {
        dispatch({ type: CREATE_NEW_NOTE, payload: newNote });
        dispatch(setActiveNoteId(newNote.id));
    });

export const deleteNoteForever = () => (dispatch, getState) => {
    const { activeNoteId } = getState().data;
    deleteNoteDB(activeNoteId, () => {
        dispatch(setNeighborActiveNote(activeNoteId));
        dispatch({ type: DELETE_NOTE, payload: activeNoteId });
        const { data } = getState().data;
        dispatch(refreshGlobalTags(data));
    });
};

export const resetTrashBin = () => (dispatch, getState) => {
    const { data } = getState().data;
    const trashBinNotes = Object.values(data).filter((note) => note.trash);
    dispatch(setActiveNoteId(null));
    Promise.all(
        trashBinNotes.map(
            async (note) =>
                await deleteNoteDB(note.id, () => {
                    dispatch({ type: DELETE_NOTE, payload: note.id });
                }),
        ),
    ).then(() => {
        const { data } = getState().data;
        dispatch(refreshGlobalTags(data));
    });
};

export const addTag = (noteId, tag) => (dispatch, getState) => {
    addNoteTagDB(noteId, tag, () => {
        const { activeNoteId, globalTags, data } = getState().data;
        const difference = { tags: [...new Set([...data[activeNoteId].tags, tag])] };
        dispatch(updateNoteData({ ...data[activeNoteId], ...difference }));
        dispatch({ type: UPDATE_GLOBAL_TAGS, payload: [...globalTags, tag] });
    });
};

export const removeTag = (noteId, tag) => (dispatch, getState) => {
    removeNoteTagDB(noteId, tag, () => {
        const { activeNoteId, data } = getState().data;
        const difference = {
            tags: [...data[activeNoteId].tags.filter((_tag) => tag !== _tag)],
        };
        dispatch(updateNoteData({ ...data[activeNoteId], ...difference }));

        const updatedData = getState().data.data;
        dispatch(refreshGlobalTags(updatedData));
    });
};

export const updateTagsSelection = (tag) => (dispatch, getState) => {
    const currentTagsSelection = getState().data.selection.tags;
    let result;
    if (currentTagsSelection.includes(tag)) {
        result = currentTagsSelection.filter((_tag) => tag !== _tag);
    } else {
        result = [...currentTagsSelection, tag];
    }
    dispatch({ type: UPDATE_TAG_SELECTION, payload: result });
    dispatch(setDefaultActiveNote());
};

export const removeGlobalTag = (tag) => (dispatch, getState) => {
    const { data } = getState().data;
    const notesWithTag = Object.values(data).filter((note) => note.tags.includes(tag));
    Promise.all(
        notesWithTag.map(
            async (note) =>
                await removeNoteTagDB(note.id, tag, () => {
                    const difference = {
                        tags: [...note.tags.filter((_tag) => tag !== _tag)],
                    };
                    dispatch(updateNoteData({ ...note, ...difference }));
                }),
        ),
    ).then(() => {
        const { data } = getState().data;
        dispatch(refreshGlobalTags(data));
        if (getState().data.selection.tags.includes(tag))
            dispatch(updateTagsSelection(tag));
    });
};

export const setSortType = (value) => ({ type: SET_SORT_TYPE, payload: value });

export const setSearchQuery = (value) => async (dispatch, getState) => {
    dispatch({ type: SET_SEARCH_QUERY, payload: value });
    const { activeNoteId } = getState().data;
    if (value || !activeNoteId) dispatch(setDefaultActiveNote());
};
