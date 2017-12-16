import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';

import flushChunks from 'webpack-flush-chunks';

import createStore from '../store';
import createApp from '../app';

export default ({ clientStats }) => async (req, res) => {
  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = createStore(global.REDUX_INITIAL_STATE, history);
  await thunk(store);

  const app = renderToString(createApp(store));
  const chunkNames = flushChunkNames();

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets,
  } = flushChunks(clientStats, { chunkNames });

  const stateJson = JSON.stringify(store.getState());

  /* eslint-disable no-console */
  console.log(req.path, {
    'dynamic chunk names rendered': chunkNames,
    'scripts served': scripts,
    'stylesheets served': stylesheets,
  });
  /* eslint-enable no-console */

  res.send(`<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
          <link rel="manifest" href="/manifest.json">
          <link rel="shortcut icon" href="/favicon.ico">

          <title>Olga ma Wypieki</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          <script>window.REDUX_INITIAL_STATE = ${stateJson}</script>
          ${js}
        </body>
      </html>`);
};
