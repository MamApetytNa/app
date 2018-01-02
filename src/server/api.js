import createRouter from 'express-promise-router';

import { NOT_FOUND } from './status';

import { getList, getItem } from '../data';

export default () => {
  const router = createRouter();

  router.get('/cake', async (req, res) => {
    const list = await getList(req.query);
    res.json(list);
  });

  router.get('/cake/:id', async (req, res) => {
    const item = await getItem(req.params.id);
    if (!item) {
      res.sendStatus(NOT_FOUND);
    } else {
      res.json(item);
    }
  });

  return router;
};
