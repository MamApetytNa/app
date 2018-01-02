import { Router as createRouter } from 'express';

import createApi from './api';
import createRender from './render';

export default (args) => {
  const router = createRouter();

  router.use('/api', createApi(args));
  router.use(createRender(args));

  return router;
};
