import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeGlobalTag } from 'store/actions/data';
import { RootState } from 'store/interfaces';
import styles from './tags.module.scss';

const Tags = () => {
    const [accessToEdit, toggleAccessToEditState] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.data.globalTags);
    return (
        <>
            <div className={styles.heading}>
                <p>Tags</p>
                <button onClick={() => toggleAccessToEditState(!accessToEdit)}>
                    {accessToEdit ? 'Done' : 'Edit'}
                </button>
            </div>
            <ul className={styles.list}>
                {data.map((tag, idx) => (
                    <li key={idx} className={styles.item}>
                        <span>{tag}</span>
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
