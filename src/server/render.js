import { minify as minifyHtml } from 'html-minifier';
import postcss from 'postcss';
import cssNano from 'cssnano';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import { SheetsRegistry } from 'react-jss/lib/jss'; // eslint-disable-line import/no-extraneous-dependencies

import flushChunks from 'webpack-flush-chunks';

import createStore from '../store';
import createApp from '../app';

function minifyCss(css) {
  return postcss([cssNano])
    .process(css, { from: 'src/app.css', to: 'dest/app.css' })
    .then(result => result.css);
}

export default ({
  clientStats,
  iconStats = { html: [] },
}) => async (req, res) => {
  const history = createHistory({ initialEntries: [req.path] });
  const { store, thunk } = createStore(global.REDUX_INITIAL_STATE, history);
  await thunk(store);

  const sheetsRegistry = new SheetsRegistry();
  const app = renderToString(createApp(store, sheetsRegistry, ({ children }) => children));
  const chunkNames = flushChunkNames();

  const {
    js,
    styles,
    cssHash,
  } = flushChunks(clientStats, { chunkNames });

  const stateJson = JSON.stringify(store.getState());
  const jssStyles = await minifyCss(sheetsRegistry.toString());
  const icons = iconStats.html.join('\n');

  res.send(minifyHtml(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="/manifest.json">

        ${icons}

        <title>Olga ma Wypieki</title>
        ${styles}
        <style id="jss-server-side">
          ${jssStyles}
        </style>
      </head>
      <body>
        <div id="root">${app}</div>
        ${cssHash}
        ${js}
        <script>window.REDUX_INITIAL_STATE = ${stateJson}</script>
      </body>
    </html>
  `));
};
