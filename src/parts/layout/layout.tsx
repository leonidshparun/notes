import Navigation from 'parts/navigation/navigation';
import Note from 'parts/note/note';
import Sidebar from 'parts/sidebar/sidebar';
import React, { useState } from 'react';
import styles from './layout.module.scss';

function Layout() {
  const [isNavigationVisible, setNavigationVisibility] = useState(false);
  const [isSidebarVisible, setSidebarVisibility] = useState(false);
  return (
    <div className={styles.page}>
      <Navigation isVisible={isNavigationVisible} />
      <main
        className={`${styles.notes} ${isNavigationVisible && styles.blur}`}
        onClickCapture={(e) => {
          if (isNavigationVisible) {
            e.stopPropagation();
            setNavigationVisibility(false);
          }
        }}
      >
        <Sidebar
          setNavigationVisibility={setNavigationVisibility}
          isNavigationVisible={isNavigationVisible}
          isSidebarVisible={isSidebarVisible}
        />
        <Note
          setSidebarVisibility={setSidebarVisibility}
          isSidebarVisible={isSidebarVisible} />
      </main>
    </div>
  );
}

export default Layout;
