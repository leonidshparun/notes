import { HIDE_NAVIGATION, TOGGLE_NAVIGATION_VISIBILITY, TOGGLE_SIDEBAR_VISIBILITY } from '../actions/view';

const viewState = {
    isNavigationVisible: false,
    isSidebarVisible: true,
};

const viewReducer = (state = viewState, action) => {
    switch (action.type) {
        case TOGGLE_NAVIGATION_VISIBILITY:
            return {
                ...state,
                isNavigationVisible: !state.isNavigationVisible,
            };
        case TOGGLE_SIDEBAR_VISIBILITY:
            return {
                ...state,
                isSidebarVisible: !state.isSidebarVisible,
            };
        case HIDE_NAVIGATION:
            return {
                ...state,
                isNavigationVisible: false,
            };
        default:
            return state;
    }
};

export default viewReducer;
