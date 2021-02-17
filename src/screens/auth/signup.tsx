import firebase from 'api/index';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from 'store/actions/user';
import styles from './auth.module.scss';

function SignUp() {
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = credentials;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                dispatch(userLogin(userCredential.user?.email, userCredential.user?.uid));
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            });
    };

    return (
        <>
            <p className={styles.heading}>Sign Up</p>
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

                <button type="submit">Sign Up</button>
                <p>{error}</p>
            </form>
        </>
    );
}

export default SignUp;
