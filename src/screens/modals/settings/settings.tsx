import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from 'store/actions/user';
import { hideModal } from 'store/actions/view';
import { userEmailSelector } from 'store/selectors/index';
import styles from './settings.module.scss';

const SettingsModal = () => {
    const userEmail = useSelector(userEmailSelector);
    const dispatch = useDispatch();
    return (
        <div>
            <ul className={styles.container}>
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
            </ul>
        </div>
    );
};
export default SettingsModal;
