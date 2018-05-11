import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const appState = createStore(reducer);

const app = (
    <Provider store={appState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
