//action names
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

//action creators = functions that create actions
export const fetchData = (city) => ({
    type: FETCH_DATA,
    city
})

export const fetchSuccess = (response) => ({
    type: FETCH_SUCCESS,
    response
});

export const fetchError = (error) => ({
    type: FETCH_ERROR,
    error
});