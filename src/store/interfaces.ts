export interface EnumNotesItem {
    text: string;
    pinned: boolean;
    id: string;
    trash: boolean;
}

export interface RootState {
    view: {
        isNavigationVisible: boolean;
        isSidebarVisible: boolean;
        route: string;
    };
    data: {
        data: [EnumNotesItem];
        loading: boolean;
        error: string;
        activeNoteId: string;
    };
    user: {
        isLoggedIn: boolean;
        email: string;
    };
}
