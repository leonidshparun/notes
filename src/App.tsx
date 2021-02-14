import React from 'react';
import { Provider } from 'react-redux';
import Layout from 'screens/layout/layout';
import store from 'store/index';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Layout />
        </Provider>
    );
}

export default App;
