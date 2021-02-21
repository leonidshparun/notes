import {
    CREATE_NEW_NOTE,
    DELETE_NOTE,
    FETCH_DATA_ERROR,
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    SET_ACTIVE_NOTE_ID,
    SET_NOTE_ID_LIST,
    SET_SEARCH_QUERY,
    SET_SORT_TYPE,
    UPDATE_GLOBAL_TAGS,
    UPDATE_NOTE_DATA,
} from '../actions/data';

const dataState = {
    data: {},
    loading: false,
    error: '',
    activeNoteId: null,
    globalTags: [],
    selection: {
        sortOption: 0,
        searchQuery: '',
    },
    noteIdList: [],
};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case FETCH_DATA_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case UPDATE_NOTE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.id]: action.payload,
                },
            };
        case SET_ACTIVE_NOTE_ID:
            return {
                ...state,
                activeNoteId: action.payload,
            };
        case CREATE_NEW_NOTE:
            return {
                ...state,
                data: { ...state.data, [action.payload.id]: action.payload },
            };
        case DELETE_NOTE:
            const { [action.payload]: value, ...rest } = state.data;
            return {
                ...state,
                data: rest,
            };
        case UPDATE_GLOBAL_TAGS:
            return {
                ...state,
                globalTags: [...new Set([...action.payload])],
            };
        case SET_NOTE_ID_LIST:
            return {
                ...state,
                noteIdList: action.payload,
            };
        case SET_SORT_TYPE:
            return {
                ...state,
                selection: {
                    ...state.selection,
                    sortOption: action.payload,
                },
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                selection: {
                    ...state.selection,
                    searchQuery: action.payload,
                },
            };
        default:
            return state;
    }
};

export default dataReducer;
