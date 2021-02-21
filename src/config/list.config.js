export const SORT_OPTIONS = [
    {
        title: 'Created: Newest',
        func: (noteA, noteB) => {
            return noteB.createdAt.seconds - noteA.createdAt.seconds;
        },
    },
    {
        title: 'Created: Oldest',
        func: (noteA, noteB) => {
            return noteA.createdAt.seconds - noteB.createdAt.seconds;
        },
    },
    {
        title: 'Modified: Newest',
        func: (noteA, noteB) => {
            return noteB.lastUpdate.seconds - noteA.lastUpdate.seconds;
        },
    },
    {
        title: 'Modified: Oldest',
        func: (noteA, noteB) => {
            return noteA.lastUpdate.seconds - noteB.lastUpdate.seconds;
        },
    },
    {
        title: 'Name: A-Z',
        func: (noteA, noteB) => {
            if (noteA.text > noteB.text) {
                return 1;
            } else if (noteA.text === noteB.text) {
                return 0;
            } else {
                return -1;
            }
        },
    },
    {
        title: 'Name: Z-A',
        func: (noteA, noteB) => {
            if (noteA.text > noteB.text) {
                return -1;
            } else if (noteA.text === noteB.text) {
                return 0;
            } else {
                return 1;
            }
        },
    },
];

export const combinedSort = (sort) => (a, b) => {
    const sortBySortType = SORT_OPTIONS[sort].func;
    if (a.pinned && !b.pinned) {
        return -1;
    } else if (!a.pinned && b.pinned) {
        return 1;
    } else {
        return sortBySortType(a, b);
    }
};

export const filterBySearchQuery = (searchQuery, note) => note.text.includes(searchQuery);

export const filterByRoute = (route, note) =>
    (route === 'all' && !note.trash) || (route === 'trash' && note.trash);

export const filterByTags = (tags, note) => tags.every((tag) => note.tags.includes(tag));

export const combinedFilter = (route, searchQuery, tags) => (note) =>
    filterBySearchQuery(searchQuery, note) &&
    filterByRoute(route, note) &&
    filterByTags(tags, note);
