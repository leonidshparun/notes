import { ReactComponent as ChecklistIcon } from 'assets/checklist.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as InfoIcon } from 'assets/information.svg';
import { ReactComponent as SidebarIcon } from 'assets/sidebar.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarVisibility } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './note.module.scss';

const Note = () => {
    const dispatch = useDispatch();
    const isSidebarVisible = useSelector((state: RootState) => state.view.isSidebarVisible);
    return (
        <section className={styles.container}>
            <header className={`${styles.heading} ${isSidebarVisible ? styles.full : ''}`}>
                <button onClick={() => dispatch(toggleSidebarVisibility())}>
                    <SidebarIcon />
                </button>
                <button>
                    <ChecklistIcon />
                </button>
                <button>
                    <DeleteIcon />
                </button>
                <button>
                    <InfoIcon />
                </button>
            </header>

            <section>Note</section>

            <footer>Add a tag...</footer>
        </section>
    );
};

export default Note;
