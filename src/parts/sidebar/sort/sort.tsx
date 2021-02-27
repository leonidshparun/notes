import { SORT_OPTIONS } from 'config/list.config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from 'store/actions/data';
import { EnumNotesItem } from 'store/interfaces';
import { themeSelector } from 'store/selectors/index';
import styles from './sort.module.scss';

interface ISortType {
    title: string;
    func: (valA: EnumNotesItem, valB: EnumNotesItem) => number;
}

const Sort = () => {
    const dispatch = useDispatch();
    const theme = useSelector(themeSelector);
    return (
        <footer className={`${styles.container} ${styles[theme]}`}>
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
