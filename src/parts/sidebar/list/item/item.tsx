import { ReactComponent as PinIcon } from 'assets/pin.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinNote, setActiveNoteId } from 'store/actions/data';
import { toggleSidebarVisibility } from 'store/actions/view';
import {
    activeNoteIdSelector,
    mediaTypeSelector,
    notePinSelector,
    noteTextSelector,
    themeSelector,
} from 'store/selectors/index';
import styles from './item.module.scss';

type ItemProps = { noteId: string };

const Item = ({ noteId }: ItemProps) => {
    const dispatch = useDispatch();
    const activeNoteId = useSelector(activeNoteIdSelector);
    const text = useSelector(noteTextSelector(noteId));

    const theme = useSelector(themeSelector);
    const isMinified = useSelector(mediaTypeSelector) !== 'full';
    const pinned = useSelector(notePinSelector(noteId));
    return (
        <li
            className={`${styles.container} ${styles[theme]} ${
                activeNoteId === noteId ? styles.active : ''
            }`}
            onClick={() => {
                dispatch(setActiveNoteId(noteId));
                if (isMinified) dispatch(toggleSidebarVisibility());
            }}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(pinNote(noteId, pinned));
                }}
                className={pinned ? styles.pinned : ''}
            >
                <PinIcon />
            </button>
            <div className={styles.card}>
                {text.trim() ? (
                    text
                        .split(/\r?\n/)
                        .map((line: string, idx: number) => <p key={idx}>{line}</p>)
                        .slice(0, 5)
                ) : (
                    <p className={styles.newNote}>New Note</p>
                )}
            </div>
        </li>
    );
};

export default Item;
