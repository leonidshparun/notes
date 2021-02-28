import { combinedFilter, combinedSort } from 'config/list.config';
import { createSelector } from 'reselect';

// data
const selectNotesData = (state) => state.data.data;
const sortOption = (state) => state.data.selection.sortOption;
export const searchQuerySelector = (state) => state.data.selection.searchQuery;
export const selectedTagsSelector = (state) => state.data.selection.tags;
export const globalTagsSelector = (state) => state.data.globalTags;
export const activeNoteIdSelector = (state) => state.data.activeNoteId;
export const globadLoaderSelector = (state) => state.data.loading;

// view
export const routeSelector = (state) => state.view.route;
export const modalStateSelector = (state) => state.view.modal;
export const mediaTypeSelector = (state) => state.view.media;
export const themeSelector = (state) => state.view.theme;
export const isNavVisibleSelector = (state) => state.view.isNavigationVisible;
export const isSidebarVisibleSelector = (state) => state.view.isSidebarVisible;
export const isInfoVisibleSelector = (state) => state.view.isInfoVisible;

// user
export const userEmailSelector = (state) => state.user.email;
export const isLoggedInSelector = (state) => state.user.isLoggedIn;

// custom
export const selectFiltredAndSortedNotesList = createSelector(
    selectNotesData,
    routeSelector,
    sortOption,
    searchQuerySelector,
    selectedTagsSelector,
    (notes, route, sortOption, searchQuery, tags) =>
        Object.values(notes)
            .filter(combinedFilter(route, searchQuery, tags))
            .sort(combinedSort(sortOption)),
);

export const selectNotesIdList = createSelector(
    selectFiltredAndSortedNotesList,
    (notes) => notes.map((note) => note.id),
);

export const selectNoteById = (state, noteId) => selectNotesData(state)[noteId];

export const noteTextSelector = (noteId) => (state) => selectNoteById(state, noteId).text;
export const noteTagsSelector = (noteId) => (state) => selectNoteById(state, noteId).tags;
export const notePinSelector = (noteId) => (state) =>
    selectNoteById(state, noteId).pinned;

export const activeNoteDataSelector = (state) =>
    selectNoteById(state, state.data.activeNoteId);
