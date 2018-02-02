import { curryN, identity, map, pathOr, pipe, uncurryN } from 'ramda';

import { updateProp, getFrom } from '../utils/fun';

export const selectItems = curryN(2, (index, ids) => ids.map(id => index[id]));

function createResolver(prop, mapUpdate = identity) {
  return curryN(2, (index, item = {}) => ({
    ...item,
    ...updateProp(mapUpdate(getFrom(index)), prop, item),
  }));
}

export const resolveTags = createResolver('tags', map);

export const resolvePhotos = createResolver('photos', map);

export const resolveThumbnail = createResolver('thumbnail');

export const resolveItem = uncurryN(2, ({ itemsIndex, photosIndex, tagsIndex }) => pipe(
  getFrom(itemsIndex),
  resolveTags(tagsIndex),
  resolvePhotos(photosIndex),
  resolveThumbnail(photosIndex),
));

export const resolveTag = createResolver('tag');

export const resolveFeatured = uncurryN(2, ({ itemsIndex, photosIndex, tagsIndex }) => {
  const resolveItemWithIndexes = resolveItem({
    itemsIndex,
    photosIndex,
    tagsIndex,
  });
  const resolveTagWithIndex = resolveTag(tagsIndex);
  const resolveItems = updateProp(map(resolveItemWithIndexes), 'items');

  return map(pipe(
    resolveItems,
    resolveTagWithIndex,
  ));
});

export const selectTagParam = pipe(pathOr('', ['location', 'query', 'tag']), String);
