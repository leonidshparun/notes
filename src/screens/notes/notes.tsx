import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNavigation } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './notes.module.scss';

function Notes() {
    const dispatch = useDispatch();
    const isNavigationVisible = useSelector(
        (state: RootState) => state.view.isNavigationVisible,
    );
    const { data, activeNoteId } = useSelector((state: RootState) => state.data);
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
            <Note data={data} noteId={activeNoteId} />
        </main>
    );
}

export default Notes;
