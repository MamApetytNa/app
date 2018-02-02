import htmlMinifier from 'html-minifier';
import postcss from 'postcss';
import cssNano from 'cssnano';
import { renderToString } from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import { SheetsRegistry } from 'react-jss/lib/jss'; // eslint-disable-line import/no-extraneous-dependencies

import flushChunks from 'webpack-flush-chunks';

import createStore from '../store';
import createApp from '../app';

function minifyHtml(html) {
  if (process.env.NODE_ENV === 'development') {
    return html;
  }

  return htmlMinifier.minify(html);
}

function minifyCss(css) {
  if (process.env.NODE_ENV === 'development') {
    return css;
  }

  return postcss([cssNano])
    .process(css, { from: 'src/app.css', to: 'dest/app.css' })
    .then(result => result.css);
}

function getManifest() {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  return '<link rel="manifest" href="/manifest.json">';
}

function getIcons(iconStats) {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }

  return iconStats.html.join('\n');
}

export default ({
  clientStats,
  iconStats = { html: [] },
}) => async (req, res) => {
  const history = createHistory({ initialEntries: [req.originalUrl] });
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
  const icons = getIcons(iconStats);
  const manifest = getManifest();

  res.send(minifyHtml(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta http-equiv="Accept-CH" content="DPR, Width, Viewport-Width">
            <meta name="theme-color" content="#000000">
            <link rel="shortcut icon" href="/icons/favicon.ico" />
            ${manifest}

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
