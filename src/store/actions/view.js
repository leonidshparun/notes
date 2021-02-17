import { setDefaultActiveNoteId } from 'store/actions/data';

export const TOGGLE_NAVIGATION_VISIBILITY = 'TOGGLE_NAVIGATION_VISIBILITY';
export const TOGGLE_SIDEBAR_VISIBILITY = 'TOGGLE_SIDEBAR_VISIBILITY';
export const HIDE_NAVIGATION = 'HIDE_NAVIGATION';
export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export const toggleNavigationVisibility = () => ({
    type: TOGGLE_NAVIGATION_VISIBILITY,
});

export const toggleSidebarVisibility = () => ({
    type: TOGGLE_SIDEBAR_VISIBILITY,
});

export const hideNavigation = () => ({
    type: HIDE_NAVIGATION,
});

export const changeRoute = (route) => async (dispatch) => {
    dispatch({
        type: CHANGE_ROUTE,
        payload: route,
    });

    dispatch(setDefaultActiveNoteId());
};
