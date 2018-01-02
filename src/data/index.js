import fs from 'fs-extra';
import glob from 'globby';
import path from 'path';
import pmap from 'p-map';
import { match, nth, pick, pipe, prop, reduce } from 'ramda';

const idPattern = /-([0-9]{0,5})\.json$/;

const dataDir = process.env.DATA_DIR;

function readGenericIndex(fileReader, indexGetter) {
  return (readerArg) => {
    const filePromise = fileReader(readerArg);
    return filePromise.then(reduce((acc, item) => {
      const index = indexGetter(item);
      if (!index) {
        return acc;
      }
      acc.set(index, item);
      return acc;
    }, new Map()));
  };
}

const readIdIndex = readGenericIndex(
  fileName => fs.readJson(path.join(dataDir, `${fileName}.json`)),
  prop('id'),
);

const filesIndexPromise = readGenericIndex(
  () => glob('*.json', {
    cwd: dataDir,
    ignore: ['photos.json', 'tags.json'],
  }),
  pipe(match(idPattern), nth(1)),
)();
const photosIndexPromise = readIdIndex('photos');
const tagsIndexPromise = readIdIndex('tags');

async function getRawItem(id) {
  const filesIndex = await filesIndexPromise;
  if (!filesIndex.has(id)) {
    return null;
  }

  try {
    return await fs.readJson(path.join(dataDir, filesIndex.get(id)));
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    return null;
  }
}

async function getFullItem(item) {
  const photosIndex = await photosIndexPromise;
  const tagsIndex = await tagsIndexPromise;

  return {
    ...item,
    thumbnail: photosIndex.get(item.thumbnail),
    photos: item.photos.map(photo => photosIndex.get(photo)),
    tags: item.tags.map(tag => tagsIndex.get(tag)),
  };
}

export async function getItem(id) {
  const item = await getRawItem(id);
  return getFullItem(item);
}

async function getItemSkeleton(item) {
  const photosIndex = await photosIndexPromise;
  return {
    ...pick(['id', 'minPrice', 'url', 'name'], item),
    thumbnail: photosIndex.get(item.thumbnail),
  };
}

export async function getList({ tag = '', limit = 0 } = {}) {
  const filesIndex = await filesIndexPromise;
  const items = await pmap(
    filesIndex.keys(),
    getItem,
    { concurrency: 4 },
  );

  const filteredItems = tag
    ? items.filter(({ tags }) => tags.includes(tag))
    : items;

  const slicedItems = limit
    ? filteredItems.slice(0, limit)
    : filteredItems;

  return pmap(
    slicedItems,
    getItemSkeleton,
    { concurrency: 4 },
  );
}
