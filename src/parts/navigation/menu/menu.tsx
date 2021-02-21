import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuConfig } from 'routes/index';
import { setDefaultActiveNote } from 'store/actions/data';
import { changeRoute } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import styles from './menu.module.scss';

const Navigation = () => {
    const dispatch = useDispatch();
    const route = useSelector((state: RootState) => state.view.route);
    return (
        <ul className={styles.container}>
            {menuConfig.map((item, idx) => (
                <li
                    key={idx}
                    className={`${styles.item} ${
                        route === item.route ? styles.active : ''
                    }`}
                >
                    {item.icon}
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(changeRoute(item.route));
                            dispatch(setDefaultActiveNote());
                        }}
                        href={item.route}
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
