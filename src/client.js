/* eslint-disable react/jsx-filename-extension */

import 'typeface-roboto-multilang/latin-ext.css';

import createHistory from 'history/createBrowserHistory';

import { hydrate } from 'react-dom';
import { SheetsRegistry } from 'react-jss/lib/jss';

import './index.css';
import createStore from './store';
import createApp from './app';
import registerServiceWorker from './registerServiceWorker';

const sheetsRegistry = new SheetsRegistry();
const history = createHistory();
const { store } = createStore(global.REDUX_INITIAL_STATE, history);

function renderApp(app) {
  const container = document.getElementById('root');

  hydrate(app, container);
}

renderApp(createApp(store, sheetsRegistry));

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    renderApp(require('./app').default(store, sheetsRegistry));
  });
} else {
  registerServiceWorker();
}
