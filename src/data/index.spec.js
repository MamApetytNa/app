/* eslint-env jest */

import { getItems, getItem, getFeatured } from './index';

describe('api', () => {
  describe('list', () => {
    it('should return array filled with objects', async () => {
      const list = await getItems();
      expect(list).toContainEqual(expect.any(Object));
    });

    it('should the item to contain basic fields only', async () => {
      const list = await getItems();
      expect(list[0]).toHaveProperty('id', expect.any(String));
      expect(list[0]).toHaveProperty('name', expect.any(String));
      expect(list[0]).toHaveProperty('thumbnail', expect.any(Object));
      expect(list[0]).toHaveProperty('url', expect.any(String));
      expect(list[0]).toHaveProperty('minPrice', expect.any(Object));

      expect(list[0]).not.toHaveProperty('description');
      expect(list[0]).not.toHaveProperty('photos');
    });

    it('should return only items with given tags', async () => {
      const taggedList = await getItems({ tag: '56181' });
      const fullItems = await Promise.all(taggedList.map(({ id }) => getItem(id)));
      fullItems.forEach((item) => {
        expect(item.tags.map(t => t.id)).toContainEqual('56181');
      });
    });

    it('should return at most given number of items', async () => {
      const limitedList = await getItems({ limit: 10 });
      expect(limitedList.length).toBeLessThanOrEqual(10);
    });
  });

  describe('item', () => {
    it('should return object with `id` property equal to passed value', async () => {
      const item = await getItem('12389');
      expect(item).toEqual(expect.any(Object));
      expect(item).toHaveProperty('id', '12389');
    });

    it('should return objects in tags collection', async () => {
      const item = await getItem('12389');
      expect(item.tags).toContainEqual(expect.any(Object));
      expect(item.tags[0]).toHaveProperty('id');
      expect(item.tags[0]).toHaveProperty('label');
    });
  });

  describe('featured', () => {
    it('should return array filled with objects', async () => {
      const list = await getFeatured();
      expect(list).toContainEqual(expect.any(Object));
    });

    it('should the object to contain id, name and items fields', async () => {
      const list = await getFeatured();
      expect(list[0]).toHaveProperty('id', expect.any(String));
      expect(list[0]).toHaveProperty('name', expect.any(String));
      expect(list[0]).toHaveProperty('items', expect.any(Array));
    });

    it('should the item to contain basic fields only', async () => {
      const [{ items }] = await getFeatured();
      expect(items[0]).toHaveProperty('id', expect.any(String));
      expect(items[0]).toHaveProperty('name', expect.any(String));
      expect(items[0]).toHaveProperty('thumbnail', expect.any(Object));
      expect(items[0]).toHaveProperty('url', expect.any(String));
      expect(items[0]).toHaveProperty('minPrice', expect.any(Object));

      expect(items[0]).not.toHaveProperty('description');
      expect(items[0]).not.toHaveProperty('photos');
    });

    it('should items of single object have all the same tag', async () => {
      const [{ items, id }] = await getFeatured();
      const tagIds = await Promise.all(items.map(async (item) => {
        const fullItem = await getItem(item.id);
        return fullItem.tags.map(tag => tag.id);
      }));

      tagIds.forEach((ids) => {
        expect(ids).toContainEqual(id);
      });
    });
  });
});
