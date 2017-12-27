const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const { default: server } = require(process.env.SERVER_PATH);
const appBuild = path.resolve(__dirname, '..');
const appPublic = path.resolve(__dirname, '..', 'public');

/* eslint-disable import/no-dynamic-require */
const clientStats = require(`${appBuild}/stats.json`);
const iconStats = require(`${appBuild}/icons.json`);
/* eslint-enable */
const PORT = parseInt(process.env.PORT, 10) || 8080;

server({
  clientStats,
  iconStats,
  port: PORT,
  buildDir: appBuild,
  publicDir: appPublic,
})
  .then(({ close }) => {
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
