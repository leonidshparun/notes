import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDefaultActiveNote } from 'store/actions/data';
import { hideNavigation, toggleInfoBlockVisibility } from 'store/actions/view';
import { isInfoVisibleSelector, isNavVisibleSelector } from 'store/selectors/index';
import styles from './notes.module.scss';

function Notes() {
    const dispatch = useDispatch();
    const isNavVisible = useSelector(isNavVisibleSelector);
    const isInfoVisible = useSelector(isInfoVisibleSelector);

    useEffect(() => {
        const initNotes = async () => {
            await Promise.resolve(dispatch(fetchData()));
            dispatch(setDefaultActiveNote());
        };
        initNotes();
    }, [dispatch]);

    return (
        <main
            className={`${styles.container} ${
                (isNavVisible || isInfoVisible) && styles.blur
            }`}
            onClickCapture={(e) => {
                if (isNavVisible) {
                    e.stopPropagation();
                    dispatch(hideNavigation());
                    return;
                }
                if (isInfoVisible) {
                    e.stopPropagation();
                    dispatch(toggleInfoBlockVisibility());
                    return;
                }
            }}
        >
            <Sidebar />
            <Note />
        </main>
    );
}

export default Notes;
