import { concat, map, pipe, prop, reduce } from 'ramda';

import { pages } from '../routes';

export function featured(state = [], { type, payload } = {}) {
  if (type === 'FEATURED_DATA') {
    return payload.map(({ items, ...rest }) => ({
      ...rest,
      items: items.map(prop('id')),
    }));
  }

  return state;
}

const addToIndex = reduce((acc, itemData) => ({
  ...acc,
  [itemData.id]: itemData,
}));

export function itemsIndex(state = {}, { type, payload } = {}) {
  if (type === 'ITEM_DATA') {
    return addToIndex(state, [payload]);
  } else if (type === 'ALL_ITEMS_DATA') {
    return addToIndex(state, payload);
  } else if (type === 'FEATURED_DATA') {
    return pipe(
      map(prop('items')),
      reduce(concat, []),
      addToIndex(state),
    )(payload);
  }

  return state;
}

export function allItems(state = [], { type, payload } = {}) {
  if (type === 'ALL_ITEMS_DATA') {
    return payload.map(prop('id'));
  }

  return state;
}

export function page(state = 'HOME', { type } = {}) {
  return pages[type] ? type : state;
}
