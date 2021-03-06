import { menuConfig } from 'config/menu.config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeSelector } from 'store/selectors/index';
import styles from './menu.module.scss';

const Navigation = () => {
    const dispatch = useDispatch();
    const route = useSelector(routeSelector);

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
                            dispatch(item.action(item.route));
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
