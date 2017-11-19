import { mapObjIndexed, prop } from 'ramda';

const routes = {
  HOME: {
    path: '/',
    filename: 'Home',
  },
  ITEM_LIST: {
    path: '/ciasta',
    filename: 'ItemList',
  },
  ITEM: {
    path: '/ciasto/:id',
    filename: 'Item',
  },
  ORDER_FORM: {
    path: '/zamowienie',
    filename: 'OrderForm',
  },
};

export const routesMap = mapObjIndexed(prop('path'), routes);

export const pages = mapObjIndexed(prop('filename'), routes);
