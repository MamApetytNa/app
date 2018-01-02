const path = require('path');

process.env.DATA_DIR = path.resolve(__dirname, '..', 'src', 'data', 'json');

const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

// eslint-disable-next-line import/no-dynamic-require
const { default: server } = require(process.env.SERVER_PATH);

const { appBuild, appPublic } = require('../config/paths');
const webpackConfig = require('../config/webpack.config.dev');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';


choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return null;
    }

    return server({
      port,
      buildDir: appBuild,
      publicDir: appPublic,
      webpackConfig,
    });
  })
  .then(({ close, url }) => {
    openBrowser(url);

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
      process.on(sig, () => {
        close();
        process.exit();
      });
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
