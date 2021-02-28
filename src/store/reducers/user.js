import { LOGIN, LOGOUT } from '../actions/user';

const persistUSerData = JSON.parse(localStorage.getItem('credentials'));

const dataState = {
    isLoggedIn: !!persistUSerData?.uid || false,
    email: persistUSerData?.email || '',
    id: persistUSerData?.uid || '',
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                email: action.payload.email,
                id: action.payload.id,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                email: '',
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default dataReducer;
