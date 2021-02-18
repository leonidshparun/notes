export interface EnumNotesItem {
    text: string;
    pinned: boolean;
    id: string;
    trash: boolean;
    tags: [string];
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
        activeNote: EnumNotesItem;
        globalTags: [string];
    };
    user: {
        isLoggedIn: boolean;
        email: string;
    };
}
