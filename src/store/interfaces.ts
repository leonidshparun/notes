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
        modal: {
            show: boolean;
            type: string | null;
        };
        media: string;
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
            tags: [string];
        };
        noteIdList: [string];
    };
    user: {
        isLoggedIn: boolean;
        email: string;
    };
}
