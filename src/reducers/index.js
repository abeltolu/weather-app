import {combineReducers} from 'redux';
import weatherReducer from './weather';

//import routerReducer for routes and history push
import { connectRouter } from 'connected-react-router';

export default (history) => combineReducers({
    router: connectRouter(history),
    weather: weatherReducer
});