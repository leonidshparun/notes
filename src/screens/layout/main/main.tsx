import GlobalLoader from 'components/globalLoader/globalLoader';
import Navigation from 'parts/navigation/navigation';
import React from 'react';
import Notes from 'screens/notes/notes';

const Main = () => (
    <>
        <Navigation />
        <Notes />
        <GlobalLoader />
    </>
);

export default Main;
