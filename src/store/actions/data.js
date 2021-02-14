export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const fetchDataStart = () => ({
    type: FETCH_DATA_START,
});

export const fetchDataError = (error) => ({
    type: FETCH_DATA_ERROR,
    payload: error,
});

export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data,
});
