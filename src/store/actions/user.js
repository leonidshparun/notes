export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const userLogin = (email, id) => ({
    type: LOGIN,
    payload: {email, id},
});

export const userLogout = (error) => ({
    type: LOGOUT,
    payload: error,
});
