import { createAction } from 'redux-actions';
import { NOT_FOUND } from 'redux-first-router';

export const goToItemList = tagId => ({
  type: 'ITEM_LIST_PAGE',
  payload: tagId && {
    query: {
      tag: tagId,
    },
  },
});

export const goToItem = createAction('ITEM_PAGE', id => ({ id }));
export const goToOrder = createAction('ORDER_PAGE');
export const goHome = createAction('HOME_PAGE');
export const notFound = createAction(NOT_FOUND);

export const featured = createAction('FEATURED_DATA');
export const allItems = createAction('ALL_ITEMS_DATA');
export const item = createAction('ITEM_DATA');
export const contactInfo = createAction('CONTACT_INFO_DATA');
