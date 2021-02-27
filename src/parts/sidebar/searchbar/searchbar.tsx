import { ReactComponent as ClearIcon } from 'assets/clear.svg';
import { ReactComponent as SearchIcon } from 'assets/search.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'services/hooks';
import { setSearchQuery } from 'store/actions/data';
import { searchQuerySelector } from 'store/selectors/index';
import styles from './searchbar.module.scss';

const Searchbar = () => {
    const dispatch = useDispatch();
    const [searchQuery, updateSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const savedQuery = useSelector(searchQuerySelector);

    useEffect(() => {
        if (debouncedSearchQuery !== savedQuery) {
            dispatch(setSearchQuery(debouncedSearchQuery));
        }
    }, [debouncedSearchQuery, dispatch, savedQuery, searchQuery]);

    return (
        <form className={styles.container}>
            <button type="submit">
                <SearchIcon />
            </button>
            <input
                type="text"
                placeholder="Search notes"
                onChange={(e) => updateSearchQuery(e.target.value)}
                value={searchQuery || ''}
            />

            <button
                style={{ visibility: searchQuery ? 'visible' : 'hidden' }}
                type="reset"
                onClick={() => updateSearchQuery('')}
            >
                <ClearIcon />
            </button>
        </form>
    );
};

export default Searchbar;
