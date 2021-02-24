import Spinner from 'components/spinner/spinner';
import Navigation from 'parts/navigation/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import { isLoggedInSelector } from 'store/selectors/index';
import Auth from '../auth/auth';
import Notes from '../notes/notes';
import styles from './layout.module.scss';

function Layout() {
    const isLoggedIn = useSelector(isLoggedInSelector);
    const loading = useSelector((state: RootState) => state.data.loading);
    return (
        <div className={styles.page}>
            {isLoggedIn ? (
                <>
                    <Navigation />
                    <Notes />
                </>
            ) : (
                <Auth />
            )}
            {loading && (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default Layout;
