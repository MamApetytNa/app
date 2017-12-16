const express = require('express');
const webpack = require('webpack');
const mergeWebpackConfigs = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { clientConfig, serverConfig } = require('../../config/webpack.config.dev');
const { appPublic } = require('../../config/paths');

const { publicPath, path: outputPath } = clientConfig.output;

module.exports = function run(port) {
  const customizedClientConfig = mergeWebpackConfigs(clientConfig, {
    devServer: { port },
  });

  const app = express();

  const multiCompiler = webpack([customizedClientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(express.static(appPublic));
  app.use(webpackDevMiddleware(multiCompiler, { publicPath, stats: { colors: true } }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(multiCompiler, {
    serverRendererOptions: { outputPath },
  }));

  return new Promise((resolve) => {
    const url = `http://localhost:${port}/`;

    const server = app.listen(port, () => {
      console.log(`Listening @ ${url}`);
    });

    resolve({
      close: () => server.close(),
      url,
    });
  });
};
