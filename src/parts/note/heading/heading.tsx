import { ReactComponent as ChecklistIcon } from 'assets/checklist.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as InfoIcon } from 'assets/information.svg';
import { ReactComponent as SidebarIcon } from 'assets/sidebar.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreNoteFromTrash, sendNoteToTrash } from 'store/actions/data';
import { toggleSidebarVisibility } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './heading.module.scss';

const Heading = ({
    handleCheckListModeBtnClick,
}: {
    handleCheckListModeBtnClick: () => void;
}) => {
    const dispatch = useDispatch();
    const isSidebarVisible = useSelector(
        (state: RootState) => state.view.isSidebarVisible,
    );
    const route = useSelector((state: RootState) => state.view.route);

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
                        onClick={() => dispatch(restoreNoteFromTrash())}
                    >
                        Delete forever
                    </button>
                </>
            )}
        </header>
    );
};

export default Heading;
