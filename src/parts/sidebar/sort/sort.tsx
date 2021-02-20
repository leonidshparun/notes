import React from 'react';
import { EnumNotesItem } from 'store/interfaces';
import styles from './sort.module.scss';

interface ISortType {
    title: string;
    func: (valA: EnumNotesItem, valB: EnumNotesItem) => number;
}
interface ISortProps {
    select: (v: number) => void;
    options: Array<ISortType>;
}

const Sort = ({ select, options }: ISortProps) => {
    return (
        <footer className={styles.container}>
            Sort by
            <select onChange={(e) => select(+e.target.value)}>
                {options.map((option: ISortType, idx: number) => (
                    <option value={idx} key={idx}>
                        {option.title}
                    </option>
                ))}
            </select>
        </footer>
    );
};

export default Sort;
