import firebase from 'api/index';
import { Modal } from 'components/modal/modal';
import Spinner from 'components/spinner/spinner';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Layout from 'screens/layout/layout';
import store from 'store/index';
import './App.css';

function App() {
    const [isFirebaseConnected, setConnecteion] = useState(false);

    useEffect(() => {
        const unlisten = firebase.auth().onAuthStateChanged(() => setConnecteion(true));
        return () => unlisten();
    }, []);

    if (!isFirebaseConnected)
        return (
            <div className="app_loading">
                <Spinner />
            </div>
        );

    return (
        <Provider store={store}>
            <Modal />
            <Layout />
        </Provider>
    );
}

export default App;
