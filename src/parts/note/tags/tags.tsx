import React, { useEffect, useState } from 'react';
import styles from './tags.module.scss';

const Tags = ({ data }: { data: [string] }) => {
    const [tags, setTags] = useState<Array<string>>(data);
    const [input, setInput] = useState<string>('');

    const removeTag = (idx: number) => {
        setTags([...tags.filter((_el, _idx) => idx !== _idx)]);
    };

    useEffect(() => {
        setTags(data)
    }, [data]);


    return (
        <footer className={styles.container}>
            <div className={styles.tagList}>
                {tags.map((tag, idx) => (
                    <div key={idx}>
                        <button onClick={() => removeTag(idx)}>x</button>
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
            <form
                className={styles.input}
                onSubmit={(e) => {
                    e.preventDefault();
                    setTags([...tags, input]);
                    setInput('');
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
