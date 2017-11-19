import { NOT_FOUND } from 'redux-first-router';

export const goToItemList = () => ({
  type: 'ITEM_LIST',
});

export const goToItem = id => ({
  type: 'ITEM',
  payload: { id },
});

export const goToOrder = () => ({
  type: 'ORDER_FORM',
});

export const notFound = () => ({
  type: NOT_FOUND,
});
