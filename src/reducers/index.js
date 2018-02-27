import {
  concat,
  converge,
  flatten,
  map,
  pipe,
  prop,
  propOr,
  reduce,
} from 'ramda';

import { pages } from '../routes';
import { updateProp } from '../utils/fun';

const extractFromItems = propName => pipe(
  map(propOr([], propName)),
  flatten,
);
const extractItemsFromGroups = extractFromItems('items');
const extractPhotosFromItems = extractFromItems('photos');
const extractThumbnailFromItems = map(prop('thumbnail'));
const getId = prop('id');
const getIds = map(getId);
const updateGettingIds = updateProp(getIds);
const normalizeTag = updateProp(getId, 'tag');
const normalizeTags = updateGettingIds('tags');
const normalizePhotos = updateGettingIds('photos');
const normalizeThumbnail = updateProp(getId, 'thumbnail');
const normalizeItem = pipe(
  normalizeTags,
  normalizePhotos,
  normalizeThumbnail,
);
const normalizeFeatured = map(pipe(
  normalizeTag,
  updateGettingIds('items'),
));
const extractGroupTags = map(prop('tag'));
const extractTagsFromItems = extractFromItems('tags');
const extractTagsFromGroupItems = pipe(
  extractItemsFromGroups,
  extractTagsFromItems,
);

export function featured(state = [], { type, payload } = {}) {
  if (type === 'FEATURED_DATA') {
    return normalizeFeatured(payload);
  }

  return state;
}

const addToIndex = reduce((acc, data) => (data ? ({
  ...acc,
  [data.id]: data,
}) : acc));

export function tagsIndex(state = {}, { type, payload } = {}) {
  const addToState = addToIndex(state);

  if (type === 'ITEM_DATA') {
    return addToState(payload.tags);
  } else if (type === 'ALL_ITEMS_DATA') {
    return pipe(
      extractTagsFromItems,
      addToState,
    )(payload);
  } else if (type === 'FEATURED_DATA') {
    return converge(
      pipe(concat, addToState),
      [extractTagsFromGroupItems, extractGroupTags],
    )(payload);
  }

  return state;
}

export function photosIndex(state = {}, { type, payload } = {}) {
  const addToState = addToIndex(state);
  const extractAndAddToIndex = converge(pipe(concat, addToState), [
    extractPhotosFromItems,
    extractThumbnailFromItems,
  ]);

  if (type === 'ITEM_DATA') {
    return extractAndAddToIndex([payload]);
  }

  if (type === 'ALL_ITEMS_DATA') {
    return extractAndAddToIndex(payload);
  } else if (type === 'FEATURED_DATA') {
    return pipe(
      extractItemsFromGroups,
      extractAndAddToIndex,
    )(payload);
  }

  return state;
}

function updateItem(currentItem, newItem) {
  if (currentItem && ('description' in currentItem)) {
    return currentItem;
  }

  return newItem;
}

export function itemsIndex(state = {}, { type, payload } = {}) {
  const addToState = reduce((acc, data) => (data ? ({
    ...acc,
    [data.id]: updateItem(acc[data.id], data),
  }) : acc))(state);

  if (type === 'ITEM_DATA') {
    return addToState([normalizeItem(payload)]);
  } else if (type === 'ALL_ITEMS_DATA') {
    return pipe(
      map(normalizeItem),
      addToState,
    )(payload);
  } else if (type === 'FEATURED_DATA') {
    return pipe(
      extractItemsFromGroups,
      map(normalizeItem),
      addToState,
    )(payload);
  }

  return state;
}

export function allItems(state = [], { type, payload } = {}) {
  if (type === 'ALL_ITEMS_DATA') {
    return getIds(payload);
  }

  return state;
}

export function page(state = 'HOME', { type } = {}) {
  return pages[type] ? type : state;
}

export function contact(state = {}, { type, payload } = {}) {
  if (type === 'CONTACT_INFO_DATA') {
    return payload;
  }

  return state;
}

export function direction(state = 'forward', { type, meta }) {
  if (!meta || !meta.location) {
    return state;
  }

  if (meta.location.kind === 'pop') {
    return 'pop';
  }

  const { type: prevType } = meta.location.prev;

  if (type === prevType) {
    return state;
  }

  if (type === 'HOME_PAGE') {
    if (prevType) {
      return 'back';
    }

    return 'forward';
  }

  if (type === 'ITEM_LIST_PAGE') {
    if (prevType === 'HOME_PAGE') {
      return 'forward';
    }

    if (prevType === 'ITEM_PAGE') {
      return 'back';
    }
  }

  if (type === 'ITEM_PAGE') {
    if (prevType === 'ITEM_LIST_PAGE') {
      return 'forward';
    }

    if (prevType === 'HOME_PAGE') {
      return 'forward';
    }
  }

  return state;
}
