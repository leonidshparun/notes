import Icon from 'components/Icon';
import React, { useState } from 'react';
import styles from './auth.module.scss';
import LogIn from './login';
import SingUp from './signup';

function Auth() {
    const [type, switchType] = useState(false);

    return (
        <div className={styles.container}>
            <Icon name="logo" width={100} svg />
            {type ? <SingUp /> : <LogIn />}

            <p className={styles.toggleForm}>
                {type ? 'Already have an account? ' : "Don't have an account? "}
                <button onClick={() => switchType(!type)}>
                    {type ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </div>
    );
}

export default Auth;
