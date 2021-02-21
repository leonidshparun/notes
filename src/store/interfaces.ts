export interface EnumNotesItem {
    text: string;
    pinned: boolean;
    id: string;
    trash: boolean;
    tags: [string];
    createdAt: {
        seconds: number;
    };
    lastUpdate: {
        seconds: number;
    };
}

export interface RootState {
    view: {
        isNavigationVisible: boolean;
        isSidebarVisible: boolean;
        route: string;
    };
    data: {
        data: {
            [key: string]: EnumNotesItem;
        };
        loading: boolean;
        error: string;
        activeNoteId: string;
        globalTags: [string];
        selection: {
            sortOption: number;
            searchQuery: string;
        };
        noteIdList: [string];
    };
    user: {
        isLoggedIn: boolean;
        email: string;
    };
}
