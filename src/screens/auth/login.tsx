import firebase from 'api/index';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'services/hooks';
import { userLogin } from 'store/actions/user';
import styles from './auth.module.scss';

function LogIn() {
    const dispatch = useDispatch();

    const [
        storedCredentials,
        setStoredCredentials,
        cleanStoredCredentials,
    ] = useLocalStorage('credentials');
    const [remember, setRemember] = useLocalStorage('saveLogin');

    const [credentials, setCredentials] = useState(
        (storedCredentials && remember && { ...storedCredentials }) || {
            email: '',
            password: '',
        },
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const saveLogin = () => {
        setRemember(remember);
        if (remember) {
            setStoredCredentials({ ...credentials });
        } else {
            cleanStoredCredentials();
        }
    };

    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = credentials;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                saveLogin();
                dispatch(userLogin(userCredential.user?.email, userCredential.user?.uid));
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            });
    };

    return (
        <>
            <p className={styles.heading}>Log In</p>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Email"
                    type="email"
                    onChange={onChange}
                    name="email"
                    value={credentials.email}
                />

                <input
                    required
                    placeholder="Password"
                    type="password"
                    onChange={onChange}
                    name="password"
                    value={credentials.password}
                />

                <label className={styles.rememberMe}>
                    <input
                        name="saveLogin"
                        checked={!!remember}
                        onChange={() => {
                            cleanStoredCredentials();
                            setRemember(!remember);
                        }}
                        type="checkbox"
                    />
                    Remember me
                </label>

                <button type="submit">Log In</button>
                <p>{error}</p>
            </form>
        </>
    );
}

export default LogIn;
