import { apiConnectionListener } from 'api/index';
import { Modal } from 'components/modal/modal';
import Preloader from 'components/preloader/preloader';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Provider } from 'react-redux';
import Layout from 'screens/layout/layout';
import { keyboardActions, keyboardBindings, useHotkeysOptions } from 'services/keyboard';
import store from 'store/index';
import 'styles/styles.scss';
import './App.css';

function App() {
    const [isFirebaseConnected, setConnection] = useState(false);

    useEffect(() => {
        const unlisten = apiConnectionListener(() => setConnection(true));
        return () => unlisten();
    }, []);

    useHotkeys(
        keyboardBindings,
        (e, handler) => keyboardActions[handler.key](),
        useHotkeysOptions,
    );

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('class', theme);
        } else {
            document.documentElement.removeAttribute('class');
        }
    }, []);

    return (
        <Provider store={store}>
            {isFirebaseConnected ? <Layout /> : <Preloader />}
            <Modal />
        </Provider>
    );
}

export default App;
