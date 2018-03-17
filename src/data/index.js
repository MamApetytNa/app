import fs from 'fs-extra';
import glob from 'globby';
import path from 'path';
import pmap from 'p-map';
import { match, nth, pick, pipe, prop, reduce } from 'ramda';

import parseMarkdown from '../utils/markdown';

const idPattern = /-([0-9]{0,5})\.json$/;

const dataDir = process.env.DATA_DIR;

const featuredPromise = fs.readJson(path.join(dataDir, 'featured.json'));

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
const contactInfoPromise = fs.readJson(path.join(dataDir, 'contact.json'));
const aboutContentPromise = fs.readFile(path.join(dataDir, 'about.md'), 'utf-8').then(parseMarkdown);

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
  if (!item) {
    return null;
  }

  return getFullItem(item);
}

const getItemSkeleton = pick(['id', 'minPrice', 'url', 'name', 'thumbnail']);

export async function getItems({ tag = '', limit = 0 } = {}) {
  const filesIndex = await filesIndexPromise;
  const items = await pmap(
    filesIndex.keys(),
    getRawItem,
    { concurrency: 4 },
  );

  const filteredItems = tag
    ? items.filter(({ tags }) => tags.includes(tag))
    : items;

  const slicedItems = limit
    ? filteredItems.slice(0, limit)
    : filteredItems;

  const fullItems = await pmap(
    slicedItems,
    getFullItem,
    { concurrency: 4 },
  );

  if (tag) {
    // because of tags index cannot be build otherwise
    return fullItems.map(fullItem => ({
      ...getItemSkeleton(fullItem),
      tags: fullItem.tags.filter(({ id }) => id === tag),
    }));
  }

  return fullItems.map(getItemSkeleton);
}

export async function getFeatured() {
  const featured = await featuredPromise;
  const tagsIndex = await tagsIndexPromise;

  return pmap(
    featured,
    async ({ tag, name, items }) => ({
      id: tag,
      tag: tagsIndex.get(tag),
      name,
      items: await (items
        ? Promise.all(items.slice(4).map(getItem))
        : getItems({ tag, limit: 4 })
      ),
    }),
    { concurrency: 4 },
  );
}

export function getContactInfo() {
  return contactInfoPromise;
}

export function getAboutContent() {
  return aboutContentPromise;
}
