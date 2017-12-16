const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const { dev, prod } = require('../src/server');

const server = process.env.NODE_ENV === 'development' ? dev : prod;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      return null;
    }

    return server(port);
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
