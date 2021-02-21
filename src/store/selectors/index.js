import { combinedSort } from 'config/sort.config';
import { createSelector } from 'reselect';

const selectNoteEntities = (state) => state.data.data;
const selectRoute = (state) => state.view.route;
const sortOption = (state) => state.data.selection.sortOption;
const searchQuery = (state) => state.data.selection.searchQuery;

export const selectFiltredNotesList = createSelector(
    selectNoteEntities,
    selectRoute,
    sortOption,
    searchQuery,
    (entities, route, sort, query) => {
        return Object.values(entities)
            .filter(
                (entity) =>
                    (route === 'all' && !entity.trash) ||
                    (route === 'trash' && entity.trash),
            )
            .sort(combinedSort(sort));
    },
);

export const selectNotesIdList = createSelector(selectFiltredNotesList, (entities) =>
    entities.map((entity) => entity.id),
);

export const selectTodoById = (state, noteId) => selectNoteEntities(state)[noteId];
