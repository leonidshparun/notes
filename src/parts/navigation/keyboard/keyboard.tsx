import { UI } from 'config/keyboard.config';
import React from 'react';
import styles from './keyboard.module.scss';

const Keyboard = () => (
    <footer className={styles.container}>
        <button onClick={UI.showShortcuts.action}>Keyboard Shortcuts</button>
    </footer>
);

export default Keyboard;
