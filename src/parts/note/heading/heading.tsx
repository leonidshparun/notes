import { ReactComponent as ChecklistIcon } from 'assets/checklist.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as InfoIcon } from 'assets/information.svg';
import { ReactComponent as SidebarIcon } from 'assets/sidebar.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteNoteForever,
    restoreNoteFromTrash,
    sendNoteToTrash,
} from 'store/actions/data';
import { toggleSidebarVisibility } from 'store/actions/view';
import { isSidebarVisibleSelector, routeSelector } from 'store/selectors/index';
import styles from './heading.module.scss';

type HeadingProps = { handleCheckListModeBtnClick: () => void };

const Heading = ({ handleCheckListModeBtnClick }: HeadingProps) => {
    const dispatch = useDispatch();
    const isSidebarVisible = useSelector(isSidebarVisibleSelector);
    const route = useSelector(routeSelector);

    return (
        <header className={`${styles.container} ${isSidebarVisible ? styles.full : ''}`}>
            <button onClick={() => dispatch(toggleSidebarVisibility())}>
                <SidebarIcon />
            </button>
            {route === 'all' ? (
                <>
                    <button onClick={handleCheckListModeBtnClick}>
                        <ChecklistIcon />
                    </button>
                    <button onClick={() => dispatch(sendNoteToTrash())}>
                        <DeleteIcon />
                    </button>
                    <button>
                        <InfoIcon />
                    </button>
                </>
            ) : (
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
            )}
        </header>
    );
};

export default Heading;