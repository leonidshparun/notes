import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from 'screens/auth/auth';
import { useMedia } from 'services/hooks';
import { setBreakPoint } from 'store/actions/view';
import { isLoggedInSelector, themeSelector } from 'store/selectors/index';
import { breakPoints, mediaType } from 'styles/responsive';
import styles from './layout.module.scss';
import Main from './main/main';

function Layout() {
    const dispatch = useDispatch();

    const isUserLoggedIn = useSelector(isLoggedInSelector);
    const theme = useSelector(themeSelector);

    const breakpoint = useMedia(breakPoints, mediaType, 'full');

    useEffect(() => {
        dispatch(setBreakPoint(breakpoint));
    }, [breakpoint, dispatch]);

    return <div className={styles[theme]}>{isUserLoggedIn ? <Main /> : <Auth />}</div>;
}

export default Layout;
