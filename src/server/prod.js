import compression from 'compression';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';

import render from './index';

export default function run({
  port,
  publicDir,
  clientStats,
  iconStats,
}) {
  const accessLogStream = fs.createWriteStream(
    '/tmp/mamapetytna-access.log',
    { flags: 'a' },
  );
  const app = express();
  app.use(morgan('combined', { stream: accessLogStream }));
  app.use(compression());
  app.use('/', express.static(publicDir));
  app.use(render({ clientStats, iconStats }));

  return new Promise((resolve) => {
    const url = `http://localhost:${port}/`;

    const server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening @ ${url}`);
    });

    resolve({
      close: () => server.close(),
      url,
    });
  });
}
