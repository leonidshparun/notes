import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import Menu from './menu/menu';
import styles from './navigation.module.scss';
import Tags from './tags/tags';

const Navigation = () => {
    const isNavigationVisible = useSelector((state: RootState) => state.view.isNavigationVisible);

    return (
        <nav className={`${styles.container} ${isNavigationVisible ? styles.visible : ''}`}>
            <Menu />
            <Tags />

            <footer>
                <button>Keyboard Shortcuts</button>
            </footer>
        </nav>
    );
};

export default Navigation;
