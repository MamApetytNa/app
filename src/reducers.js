import { propEq } from 'ramda';

import { pages } from './routes';
import data from './data';

global.REDUX_INITIAL_STATE = {
  featured: [
    {
      name: 'Na jesień',
      items: data.slice(0, 4),
    },
    {
      name: 'Z orzechami',
      items: data.slice(0, 4),
    },
    {
      name: 'Ze śliwkami',
      items: data.slice(0, 4),
    },
  ],
  item: null,
  itemList: data,
  order: null,
};

export function featured(state = []) {
  return state;
}

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
