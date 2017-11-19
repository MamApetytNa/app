import { propEq } from 'ramda';

import { pages } from './routes';
import data from './items.data';

global.REDUX_INITIAL_STATE = {
  item: null,
  itemList: data,
  order: null,
};

export function item(state = null, { type, payload: { id } = {} } = {}) {
  if (type === 'ITEM') {
    return data.find(propEq('id', String(id)));
  }
  return state;
}

export function itemList(state = null, { type } = {}) {
  if (type === 'ITEM_LIST') {
    return data;
  }
  return state;
}

export function order(state = null, { type, payload: { id } = {} } = {}) {
  if (type === 'ORDER') {
    return id;
  }
  return state;
}

export function page(state = 'HOME', { type } = {}) {
  return pages[type] || state;
}
