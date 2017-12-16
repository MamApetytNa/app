import compression from 'compression';
import express from 'express';

import render from './render';

export default function run({
  port,
  buildDir,
  clientStats,
}) {
  const app = express();
  app.use(compression());
  app.use(express.static(buildDir));
  app.use(render({ clientStats }));

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
