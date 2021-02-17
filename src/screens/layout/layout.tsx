import Navigation from 'parts/navigation/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/interfaces';
import Auth from '../auth/auth';
import Notes from '../notes/notes';
import styles from './layout.module.scss';

function Layout() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
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
