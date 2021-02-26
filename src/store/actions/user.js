export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const userLogin = (email, id) => ({
    type: LOGIN,
    payload: { email, id },
});

export const userLogout = () => (dispacth) => {
    localStorage.setItem(
        'credentials',
        JSON.stringify({
            ...JSON.parse(localStorage.getItem('credentials')),
            uid: null,
        }),
    );
    dispacth({ type: LOGOUT });
};
