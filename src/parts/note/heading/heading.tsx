import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as ChecklistIcon } from 'assets/checklist.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as InfoIcon } from 'assets/information.svg';
import { ReactComponent as LeftArrow } from 'assets/left-arrow.svg';
import { ReactComponent as SidebarIcon } from 'assets/sidebar.svg';
import Tooltip from 'components/tooltip/tooltip';
import { buildTip, UI } from 'config/keyboard.config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteForever, restoreNoteFromTrash } from 'store/actions/data';
import {
    isSidebarVisibleSelector,
    mediaTypeSelector,
    routeSelector,
} from 'store/selectors/index';
import styles from './heading.module.scss';

type HeadingProps = { handleCheckListModeBtnClick: () => void };

const Heading = ({ handleCheckListModeBtnClick }: HeadingProps) => {
    const dispatch = useDispatch();

    const isSidebarVisible = useSelector(isSidebarVisibleSelector);
    const isAllNotes = useSelector(routeSelector) === 'all';
    const isMinified = useSelector(mediaTypeSelector) !== 'full';

    const { toggleSidebar, insertChecklist, inTrash, NoteInfo, newNote } = UI;

    const allNotesControls = (
        <>
            <Tooltip tip={buildTip(insertChecklist)}>
                <button onClick={handleCheckListModeBtnClick}>
                    <ChecklistIcon />
                </button>
            </Tooltip>
            <Tooltip tip={buildTip(inTrash)}>
                <button onClick={inTrash.action}>
                    <DeleteIcon />
                </button>
            </Tooltip>
            <Tooltip tip={buildTip(NoteInfo)}>
                <button>
                    <InfoIcon />
                </button>
            </Tooltip>
        </>
    );

    const trashNotesControls = (
        <>
            <button
                className={styles.textBtn}
                onClick={() => dispatch(restoreNoteFromTrash())}
            >
                Restore
            </button>

            <button
                className={styles.textBtn}
                onClick={() => dispatch(deleteNoteForever())}
            >
                Delete forever
            </button>
        </>
    );

    return (
        <header className={`${styles.container} ${!isSidebarVisible ? styles.full : ''}`}>
            {!isSidebarVisible && isAllNotes && isMinified && (
                <div className={styles.aside}>
                    <Tooltip tip={buildTip(newNote)}>
                        <button onClick={newNote.action}>
                            <AddNoteIcon />
                        </button>
                    </Tooltip>
                </div>
            )}
            <div className={styles.wrapper}>
                <Tooltip tip={buildTip(toggleSidebar)}>
                    <button onClick={toggleSidebar.action}>
                        {isMinified ? <LeftArrow /> : <SidebarIcon />}
                    </button>
                </Tooltip>
                {isAllNotes ? allNotesControls : trashNotesControls}
            </div>
        </header>
    );
};

export default Heading;
