// const setNoteIsInTrash = (value) => async (dispatch, getState) => {
//     const { activeNote } = getState().data;
//     const difference = { trash: value };
//     dispatch(updateNoteImmediately(activeNote, difference));
//     dispatch(setDefaultActiveNote());
// };

// export const sendNoteToTrash = () => setNoteIsInTrash(true);
// export const restoreNoteFromTrash = () => setNoteIsInTrash(false);

// export const deleteNoteForever = (noteId) => (dispatch, getState) => {
//     deleteNoteDB(noteId, () => {
//         dispatch({ type: DELETE_NOTE, payload: noteId });
//         dispatch(setDefaultActiveNote());

//         const { data } = getState().data;
//         dispatch(refreshGlobalTags(data));
//     });
// };

// export const resetTrashBin = () => (dispatch, getState) => {
//     const { data } = getState().data;
//     const trashBinNotes = data.filter((note) => note.trash);
//     Promise.all(
//         trashBinNotes.map(
//             async (note) =>
//                 await deleteNoteDB(note.id, () => {
//                     dispatch({ type: DELETE_NOTE, payload: note.id });
//                     console.log('deleted note with id: ', note.id);
//                 }),
//         ),
//     ).then(() => {
//         console.log(trashBinNotes.length + ' notes deleted');
//         dispatch(setDefaultActiveNote());
//         const { data } = getState().data;
//         dispatch(refreshGlobalTags(data));
//     });
// };
