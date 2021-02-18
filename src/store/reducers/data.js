import {
    CREATE_NEW_NOTE,
    DELETE_NOTE,
    FETCH_DATA_ERROR,
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    SET_ACTIVE_NOTE_DATA,
    UPDATE_DATA,
    UPDATE_GLOBAL_TAGS,
    UPDATE_NOTE,
} from '../actions/data';

const dataState = {
    data: [],
    loading: false,
    error: '',
    activeNote: null,
    globalTags: [],
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
        case UPDATE_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case SET_ACTIVE_NOTE_DATA:
            return {
                ...state,
                activeNote: action.payload,
            };
        case CREATE_NEW_NOTE:
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        case DELETE_NOTE:
            return {
                ...state,
                data: state.data.filter((note) => note.id !== action.payload),
            };
        case UPDATE_NOTE:
            return {
                ...state,
                activeNote: action.payload,
            };
        case UPDATE_GLOBAL_TAGS:
            return {
                ...state,
                globalTags: [...new Set([...action.payload])],
            };
        default:
            return state;
    }
};

export default dataReducer;
