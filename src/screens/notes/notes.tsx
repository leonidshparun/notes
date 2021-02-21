import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDefaultActiveNote } from 'store/actions/data';
import { hideNavigation } from 'store/actions/view';
import { isNavVisibleSelector } from 'store/selectors/index';
import styles from './notes.module.scss';

function Notes() {
    const dispatch = useDispatch();
    const isNavVisible = useSelector(isNavVisibleSelector);

    useEffect(() => {
        const initNotes = async () => {
            await Promise.resolve(dispatch(fetchData()));
            dispatch(setDefaultActiveNote());
        };
        initNotes();
    }, [dispatch]);

    return (
        <main
            className={`${styles.container} ${isNavVisible && styles.blur}`}
            onClickCapture={(e) => {
                if (isNavVisible) {
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
