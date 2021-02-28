import Icon from 'components/Icon';
import React, { useState } from 'react';
import styles from './auth.module.scss';
import LogIn from './login';
import SingUp from './signup';

function Auth() {
    const [tab, switchTab] = useState(false);

    return (
        <div className={styles.container}>
            <Icon name="logo" width={100} svg />
            {tab ? <SingUp /> : <LogIn />}

            <p className={styles.toggleForm}>
                {tab ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => switchTab(!tab)}>
                    {tab ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </div>
    );
}

export default Auth;
