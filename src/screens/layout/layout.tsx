import Navigation from 'parts/navigation/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { isLoggedInSelector } from 'store/selectors/index';
import Auth from '../auth/auth';
import Notes from '../notes/notes';
import styles from './layout.module.scss';

function Layout() {
    const isLoggedIn = useSelector(isLoggedInSelector);
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
        </div>
    );
}

export default Layout;
