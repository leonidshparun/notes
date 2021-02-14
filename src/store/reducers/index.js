import { combineReducers } from 'redux';
import dataReducer from './data';
import viewReducer from './view';

const appReducer = combineReducers({
    view: viewReducer,
    data: dataReducer,
});

export default appReducer;
