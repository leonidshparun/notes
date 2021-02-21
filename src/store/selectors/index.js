import { combinedSort } from 'config/sort.config';
import { createSelector } from 'reselect';

const selectNotesData = (state) => state.data.data;
export const routeSelector = (state) => state.view.route;
const sortOption = (state) => state.data.selection.sortOption;
const searchQuery = (state) => state.data.selection.searchQuery;

export const selectFiltredAndSortedNotesList = createSelector(
    selectNotesData,
    routeSelector,
    sortOption,
    searchQuery,
    (notes, route, sort, query) => {
        return Object.values(notes)
            .filter(
                (note) =>
                    (route === 'all' && !note.trash) || (route === 'trash' && note.trash),
            )
            .sort(combinedSort(sort));
    },
);

export const selectNotesIdList = createSelector(
    selectFiltredAndSortedNotesList,
    (notes) => notes.map((note) => note.id),
);

export const selectNoteById = (state, noteId) => selectNotesData(state)[noteId];
export const activeNoteIdSelector = (state) => state.data.activeNoteId;

export const globalTagsSelector = (state) => state.data.globalTags;

export const isLoggedInSelector = (state) => state.user.isLoggedIn;
export const isNavVisibleSelector = (state) => state.view.isNavigationVisible;
export const isSidebarVisibleSelector = (state) => state.view.isSidebarVisible;

export const noteTextSelector = (noteId) => (state) => selectNoteById(state, noteId).text;
export const noteTagsSelector = (noteId) => (state) => selectNoteById(state, noteId).tags;
export const notePinSelector = (noteId) => (state) =>
    selectNoteById(state, noteId).pinned;
