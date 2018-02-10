import createRouter from 'express-promise-router';

import { NOT_FOUND } from './status';

import { getContactInfo, getFeatured, getItems, getItem } from '../data';

export default () => {
  const router = createRouter();

  router.get('/cake', async (req, res) => {
    const list = await getItems(req.query);
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

  router.get('/featured', async (req, res) => {
    const list = await getFeatured();
    res.json(list);
  });

  router.get('/contact', async (req, res) => {
    const info = await getContactInfo();
    res.json(info);
  });

  return router;
};
