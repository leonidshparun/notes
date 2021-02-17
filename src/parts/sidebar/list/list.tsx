import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from 'store/actions/data';
import { RootState } from 'store/interfaces';
import Item from './item/item';
import styles from './list.module.scss';

const List = ({ route }: { route: string }) => {
    const dispatch = useDispatch();
    const { data, loading, error, activeNoteId } = useSelector(
        (state: RootState) => state.data,
    );

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <ul className={styles.container}>
            {[...data]
                .filter((note) => {
                    if (route === 'all') {
                        return !note.trash;
                    } else if (route === 'trash') {
                        return note.trash;
                    } else return false;
                })
                .sort((note) => (note.pinned ? -1 : 1))
                .map((note, idx) => (
                    <Item key={idx} note={note} activeNoteId={activeNoteId} />
                ))}
        </ul>
    );
};

export default List;
