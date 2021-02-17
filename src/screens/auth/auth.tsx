import firebase from 'api/index';
import Icon from 'components/Icon';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/actions/user';
import styles from './auth.module.scss';

function Auth() {
    const dispatch = useDispatch();

    const [type, switchType] = useState(false);
    const [error, setError] = useState('');

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = credentials;
        firebase
            .auth()
            [type ? "createUserWithEmailAndPassword" : "signInWithEmailAndPassword"](email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                dispatch(userLogin(userCredential.user?.email, userCredential.user?.uid));
            })
            .catch((error) => {
                console.log(error);
                setError(error.message)
            });
    };

    return (
        <div className={styles.container}>
            <Icon name="logo" width={100} svg />
            <p className={styles.heading}>{type ? 'Sign Up' : 'Log In'}</p>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Email"
                    type="email"
                    onChange={(e) =>
                        setCredentials((value) => ({ ...value, email: e.target.value }))
                    }
                />

                <input
                    required
                    placeholder="Password"
                    type="password"
                    onChange={(e) =>
                        setCredentials((value) => ({
                            ...value,
                            password: e.target.value,
                        }))
                    }
                />

                <button type="submit">{type ? 'Sign Up' : 'Log In'}</button>
                <p>{error}</p>
            </form>

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
