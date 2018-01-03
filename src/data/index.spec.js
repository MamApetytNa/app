/* eslint-env jest */

import { getList, getItem } from './index';

describe('api', () => {
  describe('list', () => {
    it('should return array filled with objects', async () => {
      const list = await getList();
      expect(list).toContainEqual(expect.any(Object));
    });

    it('should the item to contain basic fields only', async () => {
      const list = await getList();
      expect(list[0]).toHaveProperty('id', expect.any(String));
      expect(list[0]).toHaveProperty('name', expect.any(String));
      expect(list[0]).toHaveProperty('thumbnail', expect.any(Object));
      expect(list[0]).toHaveProperty('url', expect.any(String));
      expect(list[0]).toHaveProperty('minPrice', expect.any(Object));

      expect(list[0]).not.toHaveProperty('description');
      expect(list[0]).not.toHaveProperty('photos');
    });

    it('should return only items with given tags', async () => {
      const taggedList = await getList({ tag: '56181' });
      const fullItems = await Promise.all(taggedList.map(({ id }) => getItem(id)));
      fullItems.forEach((item) => {
        expect(item.tags.map(t => t.id)).toContainEqual('56181');
      });
    });

    it('should return at most given number of items', async () => {
      const limitedList = await getList({ limit: 10 });
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
});
