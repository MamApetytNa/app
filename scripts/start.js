const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const { appBuild, appPublic } = require('../config/paths');

const isDev = process.env.NODE_ENV === 'development';

/* eslint-disable import/no-dynamic-require, global-require */
const { default: server } = require(`../build/server/${isDev ? 'dev' : 'main'}`);
const clientStats = require(`${appBuild}/stats.json`);
/* eslint-enable */
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return null;
    }

    return server({
      clientStats,
      port,
      buildDir: appBuild,
      publicDir: appPublic,
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
