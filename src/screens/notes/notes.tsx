import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDefaultActiveNote } from 'store/actions/data';
import { hideNavigation } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './notes.module.scss';

function Notes() {
    const dispatch = useDispatch();
    const isNavigationVisible = useSelector(
        (state: RootState) => state.view.isNavigationVisible,
    );

    useEffect(() => {
        const initNotes = async () => {
            await Promise.resolve(dispatch(fetchData()));
            dispatch(setDefaultActiveNote());
        };
        initNotes();
    }, [dispatch]);

    return (
        <main
            className={`${styles.container} ${isNavigationVisible && styles.blur}`}
            onClickCapture={(e) => {
                if (isNavigationVisible) {
                    e.stopPropagation();
                    dispatch(hideNavigation());
                }
            }}
        >
            <Sidebar />
            <Note />
        </main>
    );
}

export default Notes;
