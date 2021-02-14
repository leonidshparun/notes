export const TOGGLE_NAVIGATION_VISIBILITY = 'TOGGLE_NAVIGATION_VISIBILITY';
export const TOGGLE_SIDEBAR_VISIBILITY = 'TOGGLE_SIDEBAR_VISIBILITY';
export const HIDE_NAVIGATION = 'HIDE_NAVIGATION';

export const toggleNavigationVisibility = () => ({
    type: TOGGLE_NAVIGATION_VISIBILITY,
});

export const toggleSidebarVisibility = () => ({
    type: TOGGLE_SIDEBAR_VISIBILITY,
});

export const hideNavigation = () => ({
    type: HIDE_NAVIGATION,
});
