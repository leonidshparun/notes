import firebase from 'api/index';
import { Modal } from 'components/modal/modal';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Layout from 'screens/layout/layout';
import store from 'store/index';
import './App.css';

function App() {
    const [isFirebaseConnected, setConnecteion] = useState(false);

    useEffect(() => {
        if (firebase.auth().currentUser) {
            setConnecteion(true);
        } else {
            firebase.auth().onAuthStateChanged(() => {
                setConnecteion(true);
            });
        }
    }, []);

    if (!isFirebaseConnected) return <p>Loading</p>;

    return (
        <Provider store={store}>
            <Modal />
            <Layout />
        </Provider>
    );
}

export default App;
