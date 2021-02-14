import React from 'react';
import Menu from './menu/menu';
import styles from './navigation.module.scss';
import Tags from './tags/tags';

type NavigationProps = { isVisible: boolean };

const Navigation = ({ isVisible }: NavigationProps) => {
    return (
        <nav className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            <Menu />
            <Tags />

            <footer>
                <button>Keyboard Shortcuts</button>
            </footer>
        </nav>
    );
};

export default Navigation;
