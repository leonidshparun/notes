import { SORT_OPTIONS } from 'config/sort.config';
import { createSelector } from 'reselect';

// export const notesListSelector = (state) => {
//     const { sortOption, searchQuery } = state.data.selection;
//     const data = state.data.data;
//     const route = state.view.route;

//     const filterByRoute = (note) => {
//         if (route === 'all') {
//             return !note.trash;
//         } else if (route === 'trash') {
//             return note.trash;
//         } else return false;
//     };

//     const filterBySearchQuery = () => {
//         console.log(searchQuery);
//         return true;
//     };

//     const sortBySortType = SORT_OPTIONS[sortOption].func;

//     const sortByPin = (note) => (note.pinned ? -1 : 1);

//     const formatted = Object.values(data)
//         .filter(filterBySearchQuery)
//         .filter(filterByRoute)
//         .sort(sortBySortType)
//         .sort(sortByPin)
//         .map((note) => note.id);
//     console.log(formatted);
//     return formatted;
// };

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
        const sortBySortType = SORT_OPTIONS[sort].func;
        return Object.values(entities)
            .filter(
                (entity) =>
                    (route === 'all' && !entity.trash) ||
                    (route === 'trash' && entity.trash),
            )
            .sort((a, b) => {
                if (a.pinned && !b.pinned) {
                    return -1;
                } else if (!a.pinned && b.pinned) {
                    return 1;
                } else {
                    return sortBySortType(a, b);
                }
            });
    },
);

export const selectNotesIdList = createSelector(selectFiltredNotesList, (entities) =>
    entities.map((entity) => entity.id),
);

export const selectTodoById = (state, noteId) => selectNoteEntities(state)[noteId];
