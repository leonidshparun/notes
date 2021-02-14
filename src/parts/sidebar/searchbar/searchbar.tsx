import { ReactComponent as ClearIcon } from 'assets/clear.svg';
import { ReactComponent as SearchIcon } from 'assets/search.svg';
import React, { useState } from 'react';
import styles from './searchbar.module.scss';

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <form className={styles.container}>
            <button type="submit">
                <SearchIcon />
            </button>
            <input
                type="text"
                placeholder="Search notes and tags"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />

            <button
                style={{ visibility: searchQuery ? 'visible' : 'hidden' }}
                type="reset"
                onClick={() => setSearchQuery('')}
            >
                <ClearIcon />
            </button>
        </form>
    );
};

export default Searchbar;
