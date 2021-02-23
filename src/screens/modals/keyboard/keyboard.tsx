import { UI } from 'config/keyboard.config';
import React from 'react';
import styles from './keyboard.module.scss';

const KeyboardModal = () => {
    const buckets: {
        [key: string]: {
            [key: string]: {
                keyboardBinding: string;
                description: string;
            };
        };
    } = {};

    Object.values(UI).forEach((item) => {
        buckets[item.section] = { ...buckets[item.section] };
        buckets[item.section][item.title] = item;
    });

    return (
        <p>
            <ul>
                {Object.keys(buckets).map((section) => {
                    return (
                        <>
                            <li className={styles.submenu_header}>
                                <p>{section}</p>
                            </li>
                            {Object.values(buckets[section]).map((item) => (
                                <li className={styles.item}>
                                    <div className={styles.keys}>
                                        {item.keyboardBinding.split(/(\+)/).map((key) => (
                                            <p className={styles.keyItem}>{key}</p>
                                        ))}
                                    </div>
                                    <div className={styles.description}>
                                        <p>- {item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </>
                    );
                })}
            </ul>
        </p>
    );
};

export default KeyboardModal;
