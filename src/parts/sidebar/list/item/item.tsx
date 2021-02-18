import { ReactComponent as PinIcon } from 'assets/pin.svg';
import React from 'react';
import { useDispatch } from 'react-redux';
import { pinNote, setActiveNoteData } from 'store/actions/data';
import { EnumNotesItem } from 'store/interfaces';
import styles from './item.module.scss';

type ItemProps = { note: EnumNotesItem; activeNoteId: string };

const Item = ({ note, activeNoteId }: ItemProps) => {
    const dispatch = useDispatch();
    return (
        <li
            className={`${styles.container} ${
                activeNoteId === note.id ? styles.active : ''
            }`}
            onClick={() => dispatch(setActiveNoteData(note))}
        >
            <button
                onClick={() => dispatch(pinNote(note))}
                className={note.pinned ? styles.pinned : ''}
            >
                <PinIcon />
            </button>
            <div className={styles.card}>
                {note.text.trim() ? (
                    note.text.split(/\r?\n/).map((line, idx) => <p key={idx}>{line}</p>)
                ) : (
                    <p className={styles.newNote}>New Note</p>
                )}
            </div>
        </li>
    );
};

export default Item;
