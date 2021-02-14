import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavigationVisibility } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import List from './list/list';
import Searchbar from './searchbar/searchbar';
import styles from './sidebar.module.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebarVisible = useSelector((state: RootState) => state.view.isSidebarVisible);
    return (
        <section className={`${styles.container} ${isSidebarVisible ? styles.visible : ''}`}>
            <header className={styles.heading}>
                <button onClick={() => dispatch(toggleNavigationVisibility())}>
                    <MenuIcon />
                </button>
                <h3>All notes</h3>
                <button>
                    <AddNoteIcon />
                </button>
            </header>

            <Searchbar />
            <List />

            <footer>Sort by: Created Newest</footer>
        </section>
    );
};

export default Sidebar;
