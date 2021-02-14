import { ReactComponent as AddNoteIcon } from 'assets/add.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import React from 'react';
import List from './list/list';
import Searchbar from './searchbar/searchbar';
import styles from './sidebar.module.scss';

type SidebarProps = {
  setNavigationVisibility: (isVisible: boolean) => void;
  isNavigationVisible: boolean;
  isSidebarVisible: boolean;
};

const Sidebar = ({ setNavigationVisibility, isNavigationVisible, isSidebarVisible }: SidebarProps) => (
  <section className={`${styles.container} ${isSidebarVisible ? '' : styles.visible}`}>
    <header className={styles.heading}>
      <button onClick={() => setNavigationVisibility(!isNavigationVisible)}>
        <MenuIcon />
      </button>
      <h3>All notes</h3>
      <button>
        <AddNoteIcon />
      </button>
    </header>

    <Searchbar />
    <List />

    <footer>Sort by: Created Newest</footer>
  </section>
);

export default Sidebar;
