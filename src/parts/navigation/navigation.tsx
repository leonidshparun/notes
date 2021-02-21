import React from 'react';
import { useSelector } from 'react-redux';
import { isNavVisibleSelector } from 'store/selectors/index';
import Menu from './menu/menu';
import styles from './navigation.module.scss';
import Tags from './tags/tags';

const Navigation = () => {
    const isNavVisible = useSelector(isNavVisibleSelector);

    return (
        <nav className={`${styles.container} ${isNavVisible ? styles.visible : ''}`}>
            <Menu />
            <Tags />

            <footer>
                <button>Keyboard Shortcuts</button>
            </footer>
        </nav>
    );
};

export default Navigation;
