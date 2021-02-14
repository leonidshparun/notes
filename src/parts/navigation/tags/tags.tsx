import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import React, { useState } from 'react';
import styles from './tags.module.scss';

const TAGS = [{ value: 'Tag 1' }, { value: 'Tag 2' }];

const Tags = () => {
    const [accessToEdit, toggleAccessToEditState] = useState(false);
    return (
        <>
            <div className={styles.heading}>
                <p>Tags</p>
                <button onClick={() => toggleAccessToEditState(!accessToEdit)}>{accessToEdit ? 'Done' : 'Edit'}</button>
            </div>
            <ul className={styles.list}>
                {TAGS.map((tag, idx) => (
                    <li key={idx} className={styles.item}>
                        <span>{tag.value}</span>
                        {accessToEdit && (
                            <button>
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
