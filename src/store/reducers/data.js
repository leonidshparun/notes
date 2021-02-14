import { FETCH_DATA_ERROR, FETCH_DATA_START, FETCH_DATA_SUCCESS } from '../actions/data';

const dataState = {
    data: [],
    loading: false,
    error: '',
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
        default:
            return state;
    }
};

export default dataReducer;
