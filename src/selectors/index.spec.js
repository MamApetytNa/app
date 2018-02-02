import {
  selectItems,
  resolvePhotos,
  resolveTags,
  resolveThumbnail,
  resolveItem,
  resolveFeatured,
} from './index';

import { itemsIndex, tagsIndex, photosIndex } from './data.mock';

describe('selectors', () => {
  describe('select items', () => {
    it('should be curried function', () => {
      const partiallyApplied = selectItems(itemsIndex);

      expect(partiallyApplied).toEqual(expect.any(Function));
      expect(partiallyApplied(['1'])).toEqual(selectItems(itemsIndex, ['1']));
    });

    it('should select items from the index', () => {
      const items = selectItems(itemsIndex, ['1', '2']);

      expect(items).toEqual([itemsIndex['1'], itemsIndex['2']]);
    });
  });

  describe('resolvers', () => {
    const item = itemsIndex['1'];

    describe('photos', () => {
      it('should be curried function', () => {
        const partiallyApplied = resolvePhotos(photosIndex);

        expect(partiallyApplied).toEqual(expect.any(Function));
        expect(partiallyApplied(item)).toEqual(resolvePhotos(photosIndex, item));
      });

      it('should update photos field of the item with photos from index', () => {
        const itemWithPhotos = resolvePhotos(photosIndex, item);

        expect(itemWithPhotos).toEqual(expect.objectContaining({
          ...item,
          photos: expect.arrayContaining([photosIndex['100'], photosIndex['300']]),
        }));
      });
    });

    describe('thumbnail', () => {
      it('should be curried function', () => {
        const partiallyApplied = resolveThumbnail(photosIndex);

        expect(partiallyApplied).toEqual(expect.any(Function));
        expect(partiallyApplied(item)).toEqual(resolveThumbnail(photosIndex, item));
      });

      it('should update thumbnail field of the item with photo from index', () => {
        const itemWithPhotos = resolveThumbnail(photosIndex, item);

        expect(itemWithPhotos).toEqual(expect.objectContaining({
          ...item,
          thumbnail: photosIndex['100'],
        }));
      });
    });

    describe('tags', () => {
      it('should be curried function', () => {
        const partiallyApplied = resolveTags(tagsIndex);

        expect(partiallyApplied).toEqual(expect.any(Function));
        expect(partiallyApplied(item)).toEqual(resolveTags(tagsIndex, item));
      });

      it('should update tags field of the item with tags from index', () => {
        const itemWithTags = resolveTags(tagsIndex, item);

        expect(itemWithTags).toEqual(expect.objectContaining({
          ...item,
          tags: expect.arrayContaining([tagsIndex['10'], tagsIndex['30']]),
        }));
      });
    });

    describe('whole item', () => {
      it('should be curried function', () => {
        const partiallyApplied = resolveItem({
          itemsIndex,
          tagsIndex,
          photosIndex,
        });

        expect(partiallyApplied).toEqual(expect.any(Function));
        expect(partiallyApplied('1')).toEqual(resolveItem({
          itemsIndex,
          tagsIndex,
          photosIndex,
        }, '1'));
      });

      it('should update resolve all indexed properties of the item', () => {
        const itemWithTags = resolveItem({
          itemsIndex,
          tagsIndex,
          photosIndex,
        }, '1');

        expect(itemWithTags).toEqual(expect.objectContaining({
          ...item,
          thumbnail: photosIndex['100'],
          tags: expect.arrayContaining([tagsIndex['10'], tagsIndex['30']]),
          photos: expect.arrayContaining([photosIndex['100'], photosIndex['300']]),
        }));
      });
    });

    describe('featured items', () => {
      const featured = [{
        id: '1000',
        tag: '10',
        items: ['1', '3'],
      }, {
        id: '1000',
        tag: '30',
        items: ['2', '4'],
      }];

      it('should be curried function', () => {
        const partiallyApplied = resolveFeatured({
          itemsIndex,
          tagsIndex,
          photosIndex,
        });

        expect(partiallyApplied).toEqual(expect.any(Function));
        expect(partiallyApplied(featured)).toEqual(resolveFeatured({
          itemsIndex,
          tagsIndex,
          photosIndex,
        }, featured));
      });

      it('should resolve all indexed properties of all items', () => {
        const resolved = resolveFeatured({
          itemsIndex,
          tagsIndex,
          photosIndex,
        }, featured);

        expect(resolved[0].items[0]).toEqual(expect.objectContaining({
          thumbnail: photosIndex['100'],
          tags: expect.arrayContaining([tagsIndex['10'], tagsIndex['30']]),
          photos: expect.arrayContaining([photosIndex['100'], photosIndex['300']]),
        }));
        expect(resolved[0].items[1]).toEqual(expect.objectContaining({
          thumbnail: photosIndex['200'],
          tags: expect.arrayContaining([tagsIndex['10'], tagsIndex['20']]),
          photos: expect.arrayContaining([photosIndex['100'], photosIndex['200']]),
        }));

        expect(resolved[1].items[0]).toEqual(expect.objectContaining({
          thumbnail: photosIndex['200'],
          tags: expect.arrayContaining([tagsIndex['20'], tagsIndex['40']]),
          photos: expect.arrayContaining([photosIndex['200'], photosIndex['400']]),
        }));
        expect(resolved[1].items[1]).toEqual(expect.objectContaining({
          thumbnail: photosIndex['300'],
          tags: expect.arrayContaining([tagsIndex['20'], tagsIndex['30']]),
          photos: expect.arrayContaining([photosIndex['200'], photosIndex['300']]),
        }));
      });

      it('should resolve tags of all groups', () => {
        const resolved = resolveFeatured({
          itemsIndex,
          tagsIndex,
          photosIndex,
        }, featured);

        expect(resolved[0].tag).toEqual(tagsIndex['10']);
        expect(resolved[1].tag).toEqual(tagsIndex['30']);
      });
    });
  });
});
