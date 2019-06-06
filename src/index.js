import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

//import Reducers
import reducer from './reducers';

//import Sagas
import rootSaga from './sagas';

import App from './components/App/appContainer';

//create your sagas for yielding API calls before sending to reducers
const sagas = createSagaMiddleware();

//create redux store to save state-data
const store = createStore(
    reducer(),
    applyMiddleware(
        createLogger(), 
        sagas
    )
);

//run app sagas in background
sagas.run(rootSaga);

//render app to server
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);