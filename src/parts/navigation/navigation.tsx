import React from 'react';
import { useSelector } from 'react-redux';
import { isNavVisibleSelector } from 'store/selectors/index';
import Keyboard from './keyboard/keyboard';
import Menu from './menu/menu';
import styles from './navigation.module.scss';
import Tags from './tags/tags';

const Navigation = () => {
    const isNavVisible = useSelector(isNavVisibleSelector);

    return (
        <>
            <nav className={`${styles.container} ${isNavVisible ? styles.visible : ''}`}>
                <Menu />
                <Tags />

                <Keyboard />
            </nav>
        </>
    );
};

export default Navigation;
