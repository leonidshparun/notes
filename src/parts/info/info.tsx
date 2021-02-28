import { ReactComponent as CloseIcon } from 'assets/clear.svg';
import ToggleButton from 'components/toggleButton/toggleButton';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinNote } from 'store/actions/data';
import { toggleInfoBlockVisibility } from 'store/actions/view';
import { activeNoteDataSelector, isInfoVisibleSelector } from 'store/selectors/index';
import styles from './info.module.scss';

const Info = () => {
    const dispatch = useDispatch();
    const isInfoVisible = useSelector(isInfoVisibleSelector);
    const activeNoteData = useSelector(activeNoteDataSelector);
    if (!activeNoteData) return null;

    const { text, createdAt, lastUpdate, pinned, id } = activeNoteData;

    const noteCharCount = text.length;
    const noteWordsCount = text
        .trim()
        .split(/\s+/)
        .filter((word: string) => !/☑|☐/.test(word)).length;
    const modifiedAtTimestamp = new Date(lastUpdate.seconds * 1000).toLocaleString();
    const createdAtTimestamp = new Date(createdAt.seconds * 1000).toLocaleString();

    return (
        <aside className={`${styles.container} ${isInfoVisible ? styles.visible : ''}`}>
            <header>
                <p>Info</p>
                <button onClick={() => dispatch(toggleInfoBlockVisibility())}>
                    <CloseIcon />
                </button>
            </header>
            <ul>
                <li>
                    <p>Created:</p>
                    <p>{createdAtTimestamp}</p>
                </li>
                <li>
                    <p>Modified:</p>
                    <p>{modifiedAtTimestamp}</p>
                </li>
                <li>
                    <p>{noteWordsCount} words</p>
                </li>

                <li>
                    <p>{noteCharCount} characters</p>
                </li>

                <li className={styles.notePinOption}>
                    <span>Pin to top: </span>
                    <ToggleButton
                        action={() => dispatch(pinNote(id, pinned))}
                        state={pinned}
                    />
                </li>
            </ul>
        </aside>
    );
};

export default Info;
