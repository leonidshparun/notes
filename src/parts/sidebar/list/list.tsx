import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createNewNote, resetTrashBin } from 'store/actions/data';
import { changeRoute } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import { selectNotesIdList } from 'store/selectors/index';
import Item from './item/item';
import styles from './list.module.scss';

const List = ({ route }: { route: string }) => {
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.data.error);

    const notesIdList = useSelector(selectNotesIdList, shallowEqual);

    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            {!!notesIdList.length ? (
                <>
                    <ul className={styles.list}>
                        {notesIdList.map((noteId: string) => (
                            <Item key={noteId} noteId={noteId} />
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
