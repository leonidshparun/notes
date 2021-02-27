import Spinner from 'components/spinner/spinner';
import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'store/selectors/index';
import styles from './preloader.module.scss';

function Preloader() {
    const theme = useSelector(themeSelector);
    return (
        <div className={styles[theme]}>
            <Spinner />
        </div>
    );
}

export default Preloader;
