import { featured, allItems, item, notFound } from './actions';
import { getFeatured, getItems, getItem } from './api';
import { selectTagParam } from './selectors';

export async function HOME(dispatch) {
  const data = await getFeatured();
  if (!data || data.length === 0) {
    dispatch(notFound());
  } else {
    dispatch(featured(data));
  }
}


export async function ITEM_LIST(dispatch, getState) {
  const state = getState();
  const tagId = selectTagParam(state);
  const data = await getItems({ tag: tagId });

  if (!data || data.length === 0) {
    dispatch(notFound());
  } else {
    dispatch(allItems(data));
  }
}

export async function ITEM(dispatch, getState) {
  const state = getState();
  const itemId = String(state.location.payload.id);
  const data = await getItem(itemId);
  if (!data) {
    dispatch(notFound());
  } else {
    dispatch(item(data));
  }
}
