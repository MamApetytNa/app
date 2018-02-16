/* eslint-disable react/jsx-filename-extension */

import 'typeface-roboto-multilang/latin-ext.css';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';

import { SheetsRegistry } from './utils/jss';

import './index.css';
import createStore from './store';
import createApp from './App';
import registerServiceWorker from './registerServiceWorker';

const sheetsRegistry = new SheetsRegistry();
const history = createHistory();
const { store } = createStore(global.REDUX_INITIAL_STATE, history);

function renderApp(app) {
  const container = document.getElementById('root');

  hydrate(app, container);
}

function getAppContainer() {
  if (module.hot && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    return require('react-hot-loader').AppContainer;
  }

  return ({ children }) => children;
}

const AppContainer = getAppContainer();

setTimeout(() => {
  renderApp(createApp(store, sheetsRegistry, AppContainer));
}, 0);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    renderApp(require('./App').default(store, sheetsRegistry, AppContainer));
  });
} else {
  registerServiceWorker();
}
