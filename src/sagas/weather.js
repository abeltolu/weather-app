import axios from 'axios';

import { 
    put, 
    call, 
    takeLatest, 
    takeEvery,
    select 
} from 'redux-saga/effects';

import { 
    FETCH_DATA,
    fetchError,
    fetchSuccess
} from '../actions/weather';

//set openWeather Base URL
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const OPENWEATHER_APP_ID = "747b05fbc36503c91d678e12d2492b9f";

//get component state
const getWeatherState = (state) => state.weather;

//perform rate checker
function* fetchWeatherData(){

    //get current state of currency component.
    const { city } = yield select(getWeatherState);

    try {

        //the call() function does not run axios directly. As generators work, it only returns the object for which you will run next() on.
        const getWeather = yield call(
            axios.get,
            `${API_BASE_URL}?q=${city}&appid=${OPENWEATHER_APP_ID}&units=metric`,
        );

        //getLatest.data is the response from the AXIOS call. From there onwards, you can parse the response from the API itself

        var result = getWeather.data;
        yield put(fetchSuccess(result));
        
    } catch (error) {

        //put is Saga's middleware function for dispatching actions to the redux store
        yield put(fetchError( (error && error.response && error.response.data) ? error.response.data : {} ));
        
    }

}

export default function* (){
    //takeLatest basically takes the latest action that was called, and performs the function specified
    yield takeLatest(FETCH_DATA, fetchWeatherData);
}