import express from 'express';
import webpack from 'webpack';
import mergeWebpackConfigs from 'webpack-merge';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import { clientConfig, serverConfig } from '../../config/webpack.config.dev';

const { publicPath, path: outputPath } = clientConfig.output;

export default function run({ port, buildDir }) {
  const customizedClientConfig = mergeWebpackConfigs(clientConfig, {
    devServer: { port },
  });

  const app = express();

  const multiCompiler = webpack([customizedClientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(express.static(buildDir));
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
}
