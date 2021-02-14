import Navigation from 'parts/navigation/navigation';
import React from 'react';
import Notes from '../notes/notes';
import styles from './layout.module.scss';

function Layout() {
    return (
        <div className={styles.page}>
            <Navigation />
            <Notes />
        </div>
    );
}

export default Layout;
