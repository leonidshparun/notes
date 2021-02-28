import { combineReducers } from 'redux';
import dataReducer from './data';
import userReducer from './user';
import viewReducer from './view';

const appReducer = combineReducers({
    view: viewReducer,
    data: dataReducer,
    user: userReducer,
});

export default appReducer;
