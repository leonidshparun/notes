import { handleSignUp } from 'api/index';
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
        handleSignUp(
            credentials,
            (userCredential: { user: { email: string; uid: string } }) => {
                console.log(userCredential.user);
                dispatch(userLogin(userCredential.user?.email, userCredential.user?.uid));
            },
            (error: ErrorEvent) => {
                console.log(error);
                setError(error.message);
            },
        );
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <>
            <p className={styles.heading}>Sign Up</p>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={onInputChange}
                />

                <input
                    required
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={onInputChange}
                />

                <button type="submit">Sign Up</button>
                <p>{error}</p>
            </form>
        </>
    );
}

export default SignUp;
