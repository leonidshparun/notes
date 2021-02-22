import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'store/actions/view';
import { isNavVisibleSelector } from 'store/selectors/index';
import Menu from './menu/menu';
import styles from './navigation.module.scss';
import Tags from './tags/tags';

const Navigation = () => {
    const isNavVisible = useSelector(isNavVisibleSelector);

    const dispatch = useDispatch();
    return (
        <>
            <nav className={`${styles.container} ${isNavVisible ? styles.visible : ''}`}>
                <Menu />
                <Tags />

                <footer>
                    <button onClick={() => dispatch(showModal('KEYBOARD'))}>
                        Keyboard Shortcuts
                    </button>
                </footer>
            </nav>
        </>
    );
};

export default Navigation;
