import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import Heading from './heading/heading';
import List from './list/list';
import Searchbar from './searchbar/searchbar';
import styles from './sidebar.module.scss';
import Sort from './sort/sort';

const Sidebar = () => {
    const isSidebarVisible = useSelector((state: RootState) => state.view.isSidebarVisible);
    const route = useSelector((state: RootState) => state.view.route);
    return (
        <section className={`${styles.container}  ${isSidebarVisible ? styles.visible : ''}`}>
            <Heading route={route} />
            <Searchbar />
            <List route={route} />
            <Sort />
        </section>
    );
};

export default Sidebar;
