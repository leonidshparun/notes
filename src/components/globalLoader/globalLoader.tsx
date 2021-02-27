import Spinner from 'components/spinner/spinner';
import React from 'react';
import { useSelector } from 'react-redux';
import { globadLoaderSelector } from 'store/selectors/index';
import styles from './globalLoader.module.scss';

function GlobalLoader() {
    const globalLoading = useSelector(globadLoaderSelector);
    return (
        globalLoading && (
            <div className={styles.conainer}>
                <Spinner />
            </div>
        )
    );
}

export default GlobalLoader;
