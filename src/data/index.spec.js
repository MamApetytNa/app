/* eslint-env jest */

import { getList, getItem } from './index';

describe('api', () => {
  describe('list', () => {
    it('should return some array', async () => {
      const list = await getList();
      expect(list).toContainEqual(expect.any(Object));
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
