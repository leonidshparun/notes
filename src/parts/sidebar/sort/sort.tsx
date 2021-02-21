import { SORT_OPTIONS } from 'config/sort.config';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from 'store/actions/data';
import { EnumNotesItem } from 'store/interfaces';
import styles from './sort.module.scss';

interface ISortType {
    title: string;
    func: (valA: EnumNotesItem, valB: EnumNotesItem) => number;
}

const Sort = () => {
    const dispatch = useDispatch();
    return (
        <footer className={styles.container}>
            Sort by
            <select onChange={(e) => dispatch(setSortType(e.target.value))}>
                {SORT_OPTIONS.map((option: ISortType, idx: number) => (
                    <option value={idx} key={idx}>
                        {option.title}
                    </option>
                ))}
            </select>
        </footer>
    );
};

export default Sort;
