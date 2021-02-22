import { Modal } from 'components/modal/modal';
import React from 'react';
import { Provider } from 'react-redux';
import Layout from 'screens/layout/layout';
import store from 'store/index';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Modal />
            <Layout />
        </Provider>
    );
}

export default App;
