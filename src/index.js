import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = state => {
    return next => {
        return action => {
            console.log('[Middleware previous state] ...', state.getState());
            const result = next(action);
            console.log('[Middleware next state] ' , state.getState());
            return result;
        }
    }
}
const appState = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={appState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
