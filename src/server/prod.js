import compression from 'compression';
import express from 'express';

import render from './render';

export default function run({
  port,
  publicDir,
  clientStats,
  iconStats,
}) {
  const app = express();
  app.use(compression());
  app.use('/public', express.static(publicDir));
  app.use(render({ clientStats, iconStats }));

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
