import { ShortcutsBySections, UI } from 'config/keyboard.config';
import React, { Fragment } from 'react';
import styles from './keyboard.module.scss';

const KeyboardModal = () => (
    <ul>
        {Object.entries(ShortcutsBySections).map(([section, optionNames]) => (
            <Fragment key={section}>
                <li className={styles.submenu_header}>
                    <p>{section}</p>
                </li>
                {optionNames.map((optionName) => {
                    const item = UI[optionName];
                    return (
                        <li key={optionName} className={styles.item}>
                            <div className={styles.keys}>
                                {item.keyboardBinding.split(/(\+)/).map((key, idx) => (
                                    <p key={optionName + idx} className={styles.keyItem}>
                                        {key}
                                    </p>
                                ))}
                            </div>
                            <div className={styles.description}>
                                <p>- {item.description}</p>
                            </div>
                        </li>
                    );
                })}
            </Fragment>
        ))}
    </ul>
);
export default KeyboardModal;
