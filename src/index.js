import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import orderReducer from './store/reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    orders : orderReducer
});

const loggerMiddleware = state => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        }
    }
}
const appState = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

const app = (
    <Provider store={appState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
