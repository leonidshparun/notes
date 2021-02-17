import { LOGIN, LOGOUT } from '../actions/user';

const dataState = {
    isLoggedIn: false,
    email: '',
    id: '',
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
