import React from 'react';
import { useSelector } from 'react-redux';
import { isSidebarVisibleSelector, routeSelector } from 'store/selectors/index';
import Heading from './heading/heading';
import List from './list/list';
import Searchbar from './searchbar/searchbar';
import styles from './sidebar.module.scss';
import Sort from './sort/sort';

const Sidebar = () => {
    const isVisible = useSelector(isSidebarVisibleSelector);
    const route = useSelector(routeSelector);
    return (
        <section className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
            <Heading route={route} />
            <Searchbar />
            <List route={route} />
            <Sort />
        </section>
    );
};

export default Sidebar;
