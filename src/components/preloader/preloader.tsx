import Spinner from 'components/spinner/spinner';
import React from 'react';
import styles from './preloader.module.scss';

const Preloader = () => (
    <div className={styles.container}>
        <Spinner />
    </div>
);

export default Preloader;
