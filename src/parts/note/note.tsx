import { ReactComponent as ChecklistIcon } from 'assets/checklist.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as InfoIcon } from 'assets/information.svg';
import { ReactComponent as SidebarIcon } from 'assets/sidebar.svg';
import React from 'react';
import styles from './note.module.scss';

type NoteProps = {
    setSidebarVisibility: (isFullScreenMode: boolean) => void;
    isSidebarVisible: boolean;
};

const Note = ({ isSidebarVisible, setSidebarVisibility }: NoteProps) => (
    <section className={styles.container}>
        <header className={`${styles.heading} ${isSidebarVisible ? styles.full : ''}`}>
            <button onClick={() => setSidebarVisibility(!isSidebarVisible)}>
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

export default Note;
