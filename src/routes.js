import { mapObjIndexed, pick, prop } from 'ramda';

import * as thunks from './thunks';

function compose(...fns) {
  return (...args) => fns.reduce(
    (prev, thunk) => prev.then(() => thunk(...args)),
    Promise.resolve(),
  );
}

const routes = {
  HOME_PAGE: {
    path: '/',
    filename: 'Home',
    thunk: compose(thunks.COMMON, thunks.HOME),
  },
  ITEM_LIST_PAGE: {
    path: '/ciasta',
    filename: 'ItemList',
    thunk: compose(thunks.COMMON, thunks.ITEM_LIST),
  },
  ITEM_PAGE: {
    path: '/ciasto/:id',
    filename: 'Item',
    thunk: compose(thunks.COMMON, thunks.ITEM),
  },
  ORDER_PAGE: {
    path: '/zamowienie',
    filename: 'OrderForm',
  },
};

export const routesMap = mapObjIndexed(pick(['path', 'thunk']), routes);

export const pages = mapObjIndexed(prop('filename'), routes);
