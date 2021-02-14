import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as NoteIcon } from 'assets/note.svg';
import { ReactComponent as SettingsIcon } from 'assets/settings.svg';
import React, { useState } from 'react';
import styles from './menu.module.scss';

const MENU = [
    { title: 'All Notes', icon: <NoteIcon />, link: '/' },
    { title: 'Trash', icon: <DeleteIcon />, link: '/' },
    { title: 'Settings', icon: <SettingsIcon />, link: '/' },
];

const Navigation = () => {
    const [activeLinkIdx, setActiveLinkIdx] = useState(0);
    return (
        <ul className={styles.container}>
            {MENU.map((item, idx) => (
                <li
                    key={idx}
                    className={`
                        ${styles.item} 
                        ${activeLinkIdx === idx ? styles.active : ''}
                    `}
                >
                    {item.icon}
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveLinkIdx(idx);
                        }}
                        href={item.link}
                        className={styles.link}
                    >
                        {item.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Navigation;
