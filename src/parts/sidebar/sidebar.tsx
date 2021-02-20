import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EnumNotesItem, RootState } from 'store/interfaces';
import Heading from './heading/heading';
import List from './list/list';
import Searchbar from './searchbar/searchbar';
import styles from './sidebar.module.scss';
import Sort from './sort/sort';

const SORT_OPTIONS = [
    {
        title: 'Name: A-Z',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            if (noteA.text > noteB.text) {
                return 1;
            } else if (noteA.text === noteB.text) {
                return 0;
            } else {
                return -1;
            }
        },
    },
    {
        title: 'Name: Z-A',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            if (noteA.text > noteB.text) {
                return -1;
            } else if (noteA.text === noteB.text) {
                return 0;
            } else {
                return 1;
            }
        },
    },
    {
        title: 'Created: Newest',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            return noteB.createdAt.seconds - noteA.createdAt.seconds;
        },
    },
    {
        title: 'Created: Oldest',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            return noteA.createdAt.seconds - noteB.createdAt.seconds;
        },
    },
    {
        title: 'Modified: Newest',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            return noteB.lastUpdate.seconds - noteA.lastUpdate.seconds;
        },
    },
    {
        title: 'Modified: Oldest',
        func: (noteA: EnumNotesItem, noteB: EnumNotesItem) => {
            return noteA.lastUpdate.seconds - noteB.lastUpdate.seconds;
        },
    },
];

interface ISortType {
    title: string;
    func: (valA: EnumNotesItem, valB: EnumNotesItem) => number;
}

const Sidebar = () => {
    const isSidebarVisible = useSelector(
        (state: RootState) => state.view.isSidebarVisible,
    );

    const [sortType, setSortType] = useState<ISortType>(SORT_OPTIONS[0]);
    const route = useSelector((state: RootState) => state.view.route);
    return (
        <section
            className={`${styles.container}  ${isSidebarVisible ? styles.visible : ''}`}
        >
            <Heading route={route} />
            <Searchbar />
            <List route={route} sort={sortType} />
            <Sort
                options={SORT_OPTIONS}
                select={(v: number) => setSortType(SORT_OPTIONS[v])}
            />
        </section>
    );
};

export default Sidebar;
