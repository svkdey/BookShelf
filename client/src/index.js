import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Routes from './Routes'
import rootReducer from './reducers';

const createStoreWithMiddleware=applyMiddleware(promiseMiddleWare,ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store = {
            createStoreWithMiddleware(rootReducer)
        }>
        <BrowserRouter >
            <Routes/>
        </BrowserRouter>
    </Provider>
    
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

