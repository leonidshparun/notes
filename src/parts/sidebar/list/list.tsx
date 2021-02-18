import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, resetTrashBin } from 'store/actions/data';
import { changeRoute } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import Item from './item/item';
import styles from './list.module.scss';

const List = ({ route }: { route: string }) => {
    const dispatch = useDispatch();
    const { data, loading, error, activeNote } = useSelector(
        (state: RootState) => state.data,
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const filtred = [...data].filter((note) => {
        if (route === 'all') {
            return !note.trash;
        } else if (route === 'trash') {
            return note.trash;
        } else return false;
    });
    return (
        <div className={styles.container}>
            {!!filtred.length ? (
                <>
                    <ul className={styles.list}>
                        {filtred
                            .sort((note) => (note.pinned ? -1 : 1))
                            .map((note, idx) => (
                                <Item
                                    key={idx}
                                    note={note}
                                    activeNoteId={activeNote?.id}
                                />
                            ))}
                    </ul>
                    {route === 'trash' && (
                        <button
                            className={styles.emptyTrashBtn}
                            onClick={() => dispatch(resetTrashBin())}
                        >
                            Empty Trash
                        </button>
                    )}
                </>
            ) : (
                <div className={styles.emptyList}>
                    <p>No Notes</p>
                    <button
                        onClick={() => {
                            dispatch(createNewNote());
                            dispatch(changeRoute('all'));
                        }}
                    >
                        Create a new note
                    </button>
                </div>
            )}
        </div>
    );
};

export default List;
