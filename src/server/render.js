import htmlMinifier from 'html-minifier';
import MobileDetect from 'mobile-detect';
import postcss from 'postcss';
import cssNano from 'cssnano';
import { prop } from 'ramda';
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

function getFallbackSize(userAgent) {
  const md = new MobileDetect(userAgent);

  if (md.mobile()) {
    return {
      width: 360,
      height: 640,
    };
  }

  if (md.tablet()) {
    return {
      width: 768,
      height: 1024,
    };
  }

  return {
    width: 1366,
    height: 768,
  };
}

const metaTags = [
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',
  '<meta http-equiv="Accept-CH" content="DPR, Width, Viewport-Width">',
  '<meta name="theme-color" content="#000000">',
].join('\n');

export default ({
  clientStats,
  iconStats = { html: [] },
}) => {
  async function prepareResponse(originalUrl, userAgent) {
    const history = createHistory({ initialEntries: [originalUrl] });
    const { store, thunk } = createStore(global.REDUX_INITIAL_STATE, history);
    await thunk(store);

    const sheetsRegistry = new SheetsRegistry();
    const app = createApp(
      store,
      sheetsRegistry,
      prop('children'),
      getFallbackSize(userAgent),
    );
    const appString = renderToString(app);
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
    return minifyHtml(`
      <!doctype html>
      <html>
      <head>
        ${metaTags}
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
        <div id="root">${appString}</div>
        ${cssHash}
        ${js}
        <script>window.REDUX_INITIAL_STATE = ${stateJson}</script>
      </body>
      </html>
    `);
  }

  function printError(err) {
    return `
      <!doctype html>
      <html>
      <head>
        ${metaTags}
        <link rel="shortcut icon" href="/icons/favicon.ico" />
      </head>
      <body>
        <pre>${err.stack.toString()}</pre>
      </body>
      </html>
    `;
  }

  return async (req, res) => {
    try {
      const response = await prepareResponse(req.originalUrl, req.headers['user-agent']);
      res.send(response);
    } catch (err) {
      res.status = 500;
      res.send(printError(err));
    }
  };
};
