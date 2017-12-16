/* eslint-disable react/jsx-filename-extension */

import 'typeface-roboto/latin-ext.css';

import createHistory from 'history/createBrowserHistory';

import { hydrate } from 'react-dom';

import './index.css';
import createStore from './store';
import createApp from './app';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const { store } = createStore(global.REDUX_INITIAL_STATE, history);

function renderApp(app) {
  const container = document.getElementById('root');

  hydrate(app, container);
}

renderApp(createApp(store));

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    renderApp(require('./app').default(store));
  });
} else {
  registerServiceWorker();
}
