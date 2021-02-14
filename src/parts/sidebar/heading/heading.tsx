import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import React from 'react';
import { useDispatch } from 'react-redux';
import { titleByRoute } from 'routes/index';
import { toggleNavigationVisibility } from 'store/actions/view';
import styles from './heading.module.scss';

const Heading = ({ route }: { route: string }) => {
    const dispatch = useDispatch();
    return (
        <header className={styles.container}>
            <button onClick={() => dispatch(toggleNavigationVisibility())}>
                <MenuIcon />
            </button>
            <h3>{titleByRoute(route)}</h3>
            <button>
                <AddNoteIcon />
            </button>
        </header>
    );
};

export default Heading;
