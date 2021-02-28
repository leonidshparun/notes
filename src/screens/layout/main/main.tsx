import GlobalLoader from 'components/globalLoader/globalLoader';
import Info from 'parts/info/info';
import Navigation from 'parts/navigation/navigation';
import React from 'react';
import Notes from 'screens/notes/notes';

const Main = () => (
    <>
        <Navigation />
        <Notes />
        <Info />
        <GlobalLoader />
    </>
);

export default Main;
