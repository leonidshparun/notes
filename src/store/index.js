import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'store/reducers/index';
import { dataSaverWithDebounce } from './middleware/index';

const middlewares = [dataSaverWithDebounce, thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));

export default store;
