const Koa = require('koa');
const koaStatic = require('koa-static');

const { clientConfig } = require('../../config/webpack.config.dev');

const { publicPath, path: outputPath } = clientConfig.output;

module.exports = function run(port) {
  const clientStats = require('../public/stats.json'); // eslint-disable-line import/no-unresolved, global-require
  const serverRender = require('../public/main.js').default; // eslint-disable-line import/no-unresolved, global-require

  const app = new Koa();
  app.use(publicPath, koaStatic(outputPath));
  app.use(serverRender({ clientStats, outputPath }));

  app.listen(port, () => {
    console.log(`Listening @ http://localhost:${port}/`);
  });
};
