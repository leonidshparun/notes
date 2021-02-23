import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import Tooltip from 'components/tooltip/tooltip';
import { titleByRoute } from 'config/menu.config';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewNote } from 'store/actions/data';
import { toggleNavigationVisibility } from 'store/actions/view';
import styles from './heading.module.scss';

const Heading = ({ route }: { route: string }) => {
    const dispatch = useDispatch();
    return (
        <header className={styles.container}>
            <Tooltip tip="Menu">
                <button
                    data-title="Menu"
                    onClick={() => dispatch(toggleNavigationVisibility())}
                >
                    <MenuIcon />
                </button>
            </Tooltip>

            <h3>{titleByRoute(route)}</h3>
            <Tooltip tip="Create new note">
                <button
                    onClick={() => dispatch(createNewNote())}
                    disabled={route === 'trash'}
                    data-title="Create new note"
                >
                    <AddNoteIcon />
                </button>
            </Tooltip>
        </header>
    );
};

export default Heading;
