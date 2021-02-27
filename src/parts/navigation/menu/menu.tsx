import { menuConfig } from 'config/menu.config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routeSelector, themeSelector } from 'store/selectors/index';
import styles from './menu.module.scss';

const Navigation = () => {
    const dispatch = useDispatch();
    const route = useSelector(routeSelector);
    const theme = useSelector(themeSelector);
    return (
        <ul className={styles.container}>
            {menuConfig.map((item, idx) => (
                <li
                    key={idx}
                    className={`${styles.item} ${styles[theme]} ${
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
