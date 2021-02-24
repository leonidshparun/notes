import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import Tooltip from 'components/tooltip/tooltip';
import { buildTip, UI } from 'config/keyboard.config';
import { titleByRoute } from 'config/menu.config';
import React from 'react';
import styles from './heading.module.scss';

const Heading = ({ route }: { route: string }) => {
    const { newNote, toggleNav } = UI;
    return (
        <header className={styles.container}>
            <Tooltip tip={buildTip(toggleNav)}>
                <button onClick={toggleNav.action}>
                    <MenuIcon />
                </button>
            </Tooltip>

            <h3>{titleByRoute(route)}</h3>
            <Tooltip tip={buildTip(newNote)}>
                <button onClick={newNote.action} disabled={route === 'trash'}>
                    <AddNoteIcon />
                </button>
            </Tooltip>
        </header>
    );
};

export default Heading;
