import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'store/actions/user';
import { hideModal, setTheme } from 'store/actions/view';
import { themeSelector, userEmailSelector } from 'store/selectors/index';
import styles from './settings.module.scss';

const SettingsModal = () => {
    const userEmail = useSelector(userEmailSelector);
    const isDarkTheme = useSelector(themeSelector) === 'dark';
    const dispatch = useDispatch();
    return (
        <ul>
            <li>
                <div className={styles.submenu_container}>
                    <p className={styles.sub_heading}>Account</p>
                    <div className={styles.menu_item}>
                        <p>{userEmail}</p>
                    </div>
                    <button
                        onClick={() => {
                            dispatch(hideModal());
                            dispatch(userLogout());
                        }}
                        className={styles.logoutBtn}
                    >
                        Log Out
                    </button>
                </div>
            </li>
            <li>
                <div className={styles.submenu_container}>
                    <p className={styles.sub_heading}>Theme</p>
                    <div className={styles.menu_item}>
                        <div className={styles.theme}>
                            <p>Dark</p>
                            <button
                                onClick={() => dispatch(setTheme('dark'))}
                                className={isDarkTheme ? styles.activeTheme : ''}
                            ></button>
                        </div>
                    </div>
                    <div className={styles.menu_item}>
                        <div className={styles.theme}>
                            <p>Light</p>
                            <button
                                onClick={() => dispatch(setTheme('light'))}
                                className={!isDarkTheme ? styles.activeTheme : ''}
                            ></button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    );
};
export default SettingsModal;
