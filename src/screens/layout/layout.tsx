import Spinner from 'components/spinner/spinner';
import Navigation from 'parts/navigation/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from 'services/hooks';
import { setBreakPoint } from 'store/actions/view';
import { RootState } from 'store/interfaces';
import { isLoggedInSelector, themeSelector } from 'store/selectors/index';
import { breakPoints, mediaType } from 'styles/responsive';
import Auth from '../auth/auth';
import Notes from '../notes/notes';
import styles from './layout.module.scss';

function Layout() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const loading = useSelector((state: RootState) => state.data.loading);

    const theme = useSelector(themeSelector);
    const breakpoint = useMedia(breakPoints, mediaType, 'full');

    useEffect(() => {
        dispatch(setBreakPoint(breakpoint));
    }, [breakpoint, dispatch]);

    return (
        <div className={`${styles.page} ${styles[theme]}`}>
            {isLoggedIn ? (
                <>
                    <Navigation />
                    <Notes />
                </>
            ) : (
                <Auth />
            )}
            {loading && (
                <div className={styles.spinner}>
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default Layout;
