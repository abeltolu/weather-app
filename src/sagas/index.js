import { all, call } from 'redux-saga/effects';
import WeatherSaga from './weather';
function* watchAll() {
    yield all([
        call(WeatherSaga)
    ]);
}

export default watchAll;