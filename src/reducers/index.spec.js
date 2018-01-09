import * as actions from '../actions';

import { allItems, featured, itemsIndex } from './index';

const itemsData = [{
  id: '1',
  name: 'Item 1',
}, {
  id: '2',
  name: 'Item 2',
}, {
  id: '3',
  name: 'Item 3',
}, {
  id: '4',
  name: 'Item 4',
}, {
  id: '5',
  name: 'Item 5',
}, {
  id: '6',
  name: 'Item 6',
}];

const featuredData = [{
  id: '10',
  name: 'Featured items 1',
  items: itemsData.slice(0, 2),
}, {
  id: '20',
  name: 'Featured items 2',
  items: itemsData.slice(2, 4),
}];

describe('reducers', () => {
  describe('allItems', () => {
    it('should return empty array by default', () => {
      const state = allItems();
      expect(state).toEqual(expect.any(Array));
      expect(state).toHaveLength(0);
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should update state with items from action payload mapped to ids', () => {
        const state = allItems(null, actions.allItems(itemsData));
        expect(state).toEqual(expect.any(Array));
        expect(state).toHaveLength(itemsData.length);
        expect(state).toEqual(['1', '2', '3', '4', '5', '6']);
      });
    });
  });

  describe('featured', () => {
    it('should return empty array by default', () => {
      const state = featured();
      expect(state).toEqual(expect.any(Array));
      expect(state).toHaveLength(0);
    });

    describe('FEATURED_DATA action', () => {
      it('should update state with action payload', () => {
        const state = featured(null, actions.featured(featuredData));
        expect(state).toEqual(expect.any(Array));
        expect(state).toHaveLength(featuredData.length);

        expect(state[0]).toHaveProperty('id', featuredData[0].id);
        expect(state[0]).toHaveProperty('name', featuredData[0].name);

        expect(state[0]).toHaveProperty('id', featuredData[0].id);
        expect(state[0]).toHaveProperty('name', featuredData[0].name);
      });

      it('should map items of each group to ids', () => {
        const state = featured(null, actions.featured(featuredData));

        expect(state[0].items).toEqual(['1', '2']);
        expect(state[1].items).toEqual(['3', '4']);
      });
    });
  });

  describe('itemsIndex', () => {
    let dummyIndex;

    beforeEach(() => {
      dummyIndex = {
        1: { id: '1', name: 'My first item' },
      };
    });

    it('should return empty object by default', () => {
      const state = itemsIndex();
      expect(state).toEqual(expect.any(Object));
      expect(Object.keys(state)).toHaveLength(0);
    });

    describe('FEATURED_DATA action', () => {
      it('should add items from all groups to index', () => {
        const state = itemsIndex(null, actions.featured(featuredData));

        expect(Object.keys(state)).toHaveLength(4);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['1', '2', '3', '4']));
        expect(state['1']).toEqual(itemsData[0]);
        expect(state['2']).toEqual(itemsData[1]);
        expect(state['3']).toEqual(itemsData[2]);
        expect(state['4']).toEqual(itemsData[3]);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.featured(featuredData));

        expect(state['1']).toEqual(itemsData[0]);
      });
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should add all items to index', () => {
        const state = itemsIndex(null, actions.allItems(itemsData));

        expect(Object.keys(state)).toHaveLength(6);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5', '6']));
        expect(state['1']).toEqual(itemsData[0]);
        expect(state['2']).toEqual(itemsData[1]);
        expect(state['3']).toEqual(itemsData[2]);
        expect(state['4']).toEqual(itemsData[3]);
        expect(state['5']).toEqual(itemsData[4]);
        expect(state['6']).toEqual(itemsData[5]);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.allItems(itemsData));

        expect(state['1']).toEqual(itemsData[0]);
      });
    });

    describe('ITEM_DATA action', () => {
      it('should add item to index', () => {
        const state = itemsIndex(null, actions.item(itemsData[0]));

        expect(Object.keys(state)).toHaveLength(1);
        expect(Object.keys(state)).toEqual(['1']);
        expect(state['1']).toEqual(itemsData[0]);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.item(itemsData[0]));

        expect(state['1']).toEqual(itemsData[0]);
      });
    });
  });
});
