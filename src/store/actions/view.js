import { setDefaultActiveNote } from 'store/actions/data';

export const TOGGLE_NAVIGATION_VISIBILITY = 'TOGGLE_NAVIGATION_VISIBILITY';
export const TOGGLE_SIDEBAR_VISIBILITY = 'TOGGLE_SIDEBAR_VISIBILITY';
export const HIDE_NAVIGATION = 'HIDE_NAVIGATION';
export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_BREAKPOINT = 'SET_BREAKPOINT';
export const SET_THEME = 'SET_THEME';

export const toggleNavigationVisibility = () => ({
    type: TOGGLE_NAVIGATION_VISIBILITY,
});

export const toggleSidebarVisibility = () => ({
    type: TOGGLE_SIDEBAR_VISIBILITY,
});

export const hideNavigation = () => ({
    type: HIDE_NAVIGATION,
});

export const changeRoute = (route) => ({
    type: CHANGE_ROUTE,
    payload: route,
});

export const switchScreen = (route) => (dispatch) => {
    dispatch(changeRoute(route));
    dispatch(setDefaultActiveNote());
};

export const setBreakPoint = (type) => ({
    type: SET_BREAKPOINT,
    payload: type,
});

export const showModal = (modalType) => ({ type: SHOW_MODAL, payload: modalType });

export const hideModal = () => ({ type: HIDE_MODAL });

export const setTheme = (theme) => (dispatch) => {
    dispatch({ type: SET_THEME, payload: theme });
    localStorage.setItem('theme', theme);
};
