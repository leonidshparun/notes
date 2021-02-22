import {
    CHANGE_ROUTE,
    HIDE_MODAL,
    HIDE_NAVIGATION,
    SHOW_MODAL,
    TOGGLE_NAVIGATION_VISIBILITY,
    TOGGLE_SIDEBAR_VISIBILITY,
} from '../actions/view';

const viewState = {
    isNavigationVisible: false,
    isSidebarVisible: true,
    route: 'all',
    modal: {
        show: false,
        type: null,
    },
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
        case CHANGE_ROUTE:
            return {
                ...state,
                route: action.payload,
            };
        case SHOW_MODAL: {
            return {
                ...state,
                modal: {
                    show: true,
                    type: action.payload,
                },
            };
        }
        case HIDE_MODAL: {
            return {
                ...state,
                modal: {
                    show: false,
                    type: null,
                },
            };
        }
        default:
            return state;
    }
};

export default viewReducer;
