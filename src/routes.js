import { mapObjIndexed, pick, prop } from 'ramda';

import * as thunks from './thunks';

const routes = {
  HOME_PAGE: {
    path: '/',
    filename: 'Home',
    thunk: thunks.HOME,
  },
  ITEM_LIST_PAGE: {
    path: '/ciasta',
    filename: 'ItemList',
    thunk: thunks.ITEM_LIST,
  },
  ITEM_PAGE: {
    path: '/ciasto/:id',
    filename: 'Item',
    thunk: thunks.ITEM,
  },
  ORDER_FORM_PAGE: {
    path: '/zamowienie',
    filename: 'OrderForm',
  },
};

export const routesMap = mapObjIndexed(pick(['path', 'thunk']), routes);

export const pages = mapObjIndexed(prop('filename'), routes);
