import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag } from 'store/actions/data';
import { noteTagsSelector } from 'store/selectors/index';
import styles from './tags.module.scss';

type TagsProps = { noteId: string };

const Tags = ({ noteId }: TagsProps) => {
    const dispatch = useDispatch();
    const data = useSelector(noteTagsSelector(noteId));
    const [input, setInput] = useState<string>('');

    const addNewTag = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        dispatch(addTag(noteId, trimmed));
        setInput('');
    };

    const removeSelectedTag = (tag: string) => {
        dispatch(removeTag(noteId, tag));
    };

    return (
        <footer className={styles.container}>
            {data.map((tag: string, idx: number) => (
                <div className={styles.tagItem} key={idx}>
                    <button onClick={() => removeSelectedTag(tag)}>x</button>
                    <span>{tag}</span>
                </div>
            ))}
            <form
                className={styles.input}
                onSubmit={(e) => {
                    e.preventDefault();
                    addNewTag();
                }}
            >
                <input
                    placeholder="Add a tag..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>
        </footer>
    );
};

export default Tags;
