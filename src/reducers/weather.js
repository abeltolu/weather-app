//get component actions
import { 
    FETCH_DATA,
    FETCH_SUCCESS,
    FETCH_ERROR
} from '../actions/weather';

//we need this to reset state to initial state when the page is changed
import { LOCATION_CHANGE  } from 'react-router-redux'; 

//define the initial state of the action before any actions are dispatched
const initialState = {
    forecast: null,
    city: null,
    isLoading: false,
    status: null
};

export default (state, action) => {
    if(state === undefined){
        return initialState;
    }

    //implement switch case on each actions
    switch(action.type){
        case FETCH_DATA:
            return {
                ...state,
                isLoading: true,
                status: null,
                city: action.city
            }

        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                status: "success",
                forecast: action.response
            }

        case FETCH_ERROR:
        
            return {
                ...state,
                isLoading: false,
                forecast: action.error,
                status: "failed",
            }

        case LOCATION_CHANGE:
            return initialState;

        default:
            return state;

    }
}