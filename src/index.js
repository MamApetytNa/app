/* eslint-disable react/jsx-filename-extension */

import 'typeface-roboto'; // eslint-disable-line import/extensions

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  global.document.getElementById('root'),
);
registerServiceWorker();
