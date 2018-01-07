import { createAction } from 'redux-actions';
import { NOT_FOUND } from 'redux-first-router';

export const goToItemList = createAction('ITEM_LIST_PAGE');
export const goToItem = createAction('ITEM_PAGE', id => ({ id }));
export const goToOrder = createAction('ORDER_FORM_PAGE');
export const goHome = createAction('HOME_PAGE');

export const notFound = createAction(NOT_FOUND);

export const featured = createAction('FEATURED_DATA');
export const allItems = createAction('ALL_ITEMS_DATA');
export const item = createAction('ITEM_DATA');
