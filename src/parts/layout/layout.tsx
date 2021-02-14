import Navigation from 'parts/navigation/navigation';
import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { hideNavigation } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './layout.module.scss';

function Layout() {
  const dispatch = useDispatch()
  const isNavigationVisible = useSelector((state: RootState) => state.view.isNavigationVisible)
  return (
    <div className={styles.page}>
      <Navigation isVisible={isNavigationVisible} />
      <main
        className={`${styles.notes} ${isNavigationVisible && styles.blur}`}
        onClickCapture={(e) => {
          if (isNavigationVisible) {
            e.stopPropagation();
            dispatch(hideNavigation());
          }
        }}
      >
        <Sidebar />
        <Note />
      </main>
    </div>
  );
}

export default Layout;
