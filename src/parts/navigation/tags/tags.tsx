import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGlobalTag, updateTagsSelection } from 'store/actions/data';
import { globalTagsSelector, selectedTagsSelector } from 'store/selectors/index';
import styles from './tags.module.scss';

const Tags = () => {
    const [accessToEdit, toggleAccessToEditState] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(globalTagsSelector);
    const selected = useSelector(selectedTagsSelector);
    return (
        <>
            <div className={`${styles.heading} `}>
                <p>Tags</p>
                <button onClick={() => toggleAccessToEditState(!accessToEdit)}>
                    {accessToEdit ? 'Done' : 'Edit'}
                </button>
            </div>
            <ul className={styles.list}>
                {data.map((tag: string, idx: number) => (
                    <li
                        key={idx}
                        className={`${styles.item} ${
                            selected.includes(tag) ? styles.hilight : ''
                        }`}
                    >
                        <span onClick={() => dispatch(updateTagsSelection(tag))}>
                            {tag}
                        </span>
                        {accessToEdit && (
                            <button onClick={() => dispatch(removeGlobalTag(tag))}>
                                <DeleteIcon />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Tags;
