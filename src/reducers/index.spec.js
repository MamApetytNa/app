import * as actions from '../actions';

import {
  allItems,
  featured,
  itemsIndex,
  tagsIndex,
  photosIndex,
} from './index';

import * as data from './data.mock';

describe('reducers', () => {
  describe('allItems', () => {
    it('should return empty array by default', () => {
      const state = allItems();
      expect(state).toEqual(expect.any(Array));
      expect(state).toHaveLength(0);
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should update state with items from action payload mapped to ids', () => {
        const state = allItems(null, actions.allItems(data.items));
        expect(state).toEqual(expect.any(Array));
        expect(state).toHaveLength(data.items.length);
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
        const state = featured(null, actions.featured(data.featured));
        expect(state).toEqual(expect.any(Array));
        expect(state).toHaveLength(data.featured.length);

        expect(state[0]).toHaveProperty('id', data.featured[0].id);
        expect(state[0]).toHaveProperty('name', data.featured[0].name);

        expect(state[0]).toHaveProperty('id', data.featured[0].id);
        expect(state[0]).toHaveProperty('name', data.featured[0].name);
      });

      it('should map items of each group to ids', () => {
        const state = featured(null, actions.featured(data.featured));

        expect(state[0].items).toEqual(['1', '2']);
        expect(state[1].items).toEqual(['3', '4']);
      });

      it('should map tag for each group to its id', () => {
        const state = featured(null, actions.featured(data.featured));

        expect(state[0].tag).toEqual('50');
        expect(state[1].tag).toEqual('60');
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
        const state = itemsIndex(null, actions.featured(data.featured));

        expect(Object.keys(state)).toHaveLength(4);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['1', '2', '3', '4']));
        expect(state['1'].id).toEqual(data.items[0].id);
        expect(state['2'].id).toEqual(data.items[1].id);
        expect(state['3'].id).toEqual(data.items[2].id);
        expect(state['4'].id).toEqual(data.items[3].id);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.featured(data.featured));

        expect(state['1'].id).toEqual(data.items[0].id);
      });

      it('should normalize items before adding to index', () => {
        const state = itemsIndex(null, actions.featured(data.featured));

        expect(state['1'].id).toEqual(data.items[0].id);
        expect(state['1'].name).toEqual(data.items[0].name);
        expect(state['1'].tags).toEqual(data.items[0].tags.map(tag => tag.id));
      });
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should add all items to index', () => {
        const state = itemsIndex(null, actions.allItems(data.items));

        expect(Object.keys(state)).toHaveLength(6);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5', '6']));
        expect(state['1'].id).toEqual(data.items[0].id);
        expect(state['2'].id).toEqual(data.items[1].id);
        expect(state['3'].id).toEqual(data.items[2].id);
        expect(state['4'].id).toEqual(data.items[3].id);
        expect(state['5'].id).toEqual(data.items[4].id);
        expect(state['6'].id).toEqual(data.items[5].id);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.allItems(data.items));

        expect(state['1'].id).toEqual(data.items[0].id);
      });

      it('should normalize items before adding to index', () => {
        const state = itemsIndex(null, actions.allItems(data.items));

        expect(state['1'].id).toEqual(data.items[0].id);
        expect(state['1'].name).toEqual(data.items[0].name);
        expect(state['1'].tags).toEqual(data.items[0].tags.map(tag => tag.id));
      });
    });

    describe('ITEM_DATA action', () => {
      it('should add item to index', () => {
        const state = itemsIndex(null, actions.item(data.items[0]));

        expect(Object.keys(state)).toHaveLength(1);
        expect(Object.keys(state)).toEqual(['1']);
        expect(state['1'].id).toEqual(data.items[0].id);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = itemsIndex(dummyIndex, actions.item(data.items[0]));

        expect(state['1'].id).toEqual(data.items[0].id);
      });

      it('should normalize items before adding to index', () => {
        const state = itemsIndex(null, actions.item(data.items[0]));

        expect(state['1'].id).toEqual(data.items[0].id);
        expect(state['1'].name).toEqual(data.items[0].name);
        expect(state['1'].tags).toEqual(data.items[0].tags.map(tag => tag.id));
      });
    });
  });

  describe('tagsIndex', () => {
    let dummyIndex;

    beforeEach(() => {
      dummyIndex = {
        10: { id: '10', label: 'Some tag' },
      };
    });

    it('should return empty object by default', () => {
      const state = tagsIndex();
      expect(state).toEqual(expect.any(Object));
      expect(Object.keys(state)).toHaveLength(0);
    });

    describe('FEATURED_DATA action', () => {
      it('should add all tags from all items from all groups as well as all group tags', () => {
        const state = tagsIndex(null, actions.featured(data.featured));

        expect(Object.keys(state)).toHaveLength(6);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['10', '20', '30', '40', '50', '60']));
        expect(state['10']).toEqual(data.tags[0]);
        expect(state['20']).toEqual(data.tags[1]);
        expect(state['30']).toEqual(data.tags[2]);
        expect(state['40']).toEqual(data.tags[3]);
        expect(state['50']).toEqual(data.tags[4]);
        expect(state['60']).toEqual(data.tags[5]);
      });

      it('should replace existing tags with ones from item in action payload', () => {
        const state = tagsIndex(dummyIndex, actions.featured(data.featured));

        expect(state['10'].label).not.toEqual(dummyIndex['10'].label);
      });
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should add all tags from all items', () => {
        const state = tagsIndex(null, actions.allItems(data.items));

        expect(Object.keys(state)).toHaveLength(4);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['10', '20', '30', '40']));
        expect(state['10']).toEqual(data.tags[0]);
        expect(state['20']).toEqual(data.tags[1]);
        expect(state['30']).toEqual(data.tags[2]);
        expect(state['40']).toEqual(data.tags[3]);
      });

      it('should replace existing tags with ones from item in action payload', () => {
        const state = tagsIndex(dummyIndex, actions.allItems(data.items));

        expect(state['10'].label).not.toEqual(dummyIndex['10'].label);
      });
    });

    describe('ITEM_DATA action', () => {
      it('should add all tags from item', () => {
        const state = tagsIndex(null, actions.item(data.items[0]));

        expect(Object.keys(state)).toHaveLength(2);
        expect(Object.keys(state)).toEqual(['10', '30']);
        expect(state['10']).toEqual(data.tags[0]);
        expect(state['30']).toEqual(data.tags[2]);
      });

      it('should replace existing tags with ones from item if action payload', () => {
        const state = tagsIndex(dummyIndex, actions.item(data.items[0]));

        expect(state['10'].label).not.toEqual(dummyIndex['10'].label);
      });
    });
  });

  describe('photosIndex', () => {
    let dummyIndex;

    beforeEach(() => {
      dummyIndex = {
        100: { id: '100', original: 'http://some.photo/image.jpg' },
      };
    });

    it('should return empty object by default', () => {
      const state = photosIndex();
      expect(state).toEqual(expect.any(Object));
      expect(Object.keys(state)).toHaveLength(0);
    });

    describe('FEATURED_DATA action', () => {
      it('should add all photos from all items from all groups', () => {
        const state = photosIndex(null, actions.featured(data.featured));

        expect(Object.keys(state)).toHaveLength(4);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['100', '200', '300', '400']));
        expect(state['100']).toEqual(data.photos[0]);
        expect(state['200']).toEqual(data.photos[1]);
        expect(state['300']).toEqual(data.photos[2]);
        expect(state['400']).toEqual(data.photos[3]);
      });

      it('should replace existing photos with ones from item in action payload', () => {
        const state = photosIndex(dummyIndex, actions.featured(data.featured));

        expect(state['100'].original).not.toEqual(dummyIndex['100'].original);
      });
    });

    describe('ALL_ITEMS_DATA action', () => {
      it('should add all photos from all items', () => {
        const state = photosIndex(null, actions.allItems(data.items));

        expect(Object.keys(state)).toHaveLength(4);
        expect(Object.keys(state)).toEqual(expect.arrayContaining(['100', '200', '300', '400']));
        expect(state['100']).toEqual(data.photos[0]);
        expect(state['200']).toEqual(data.photos[1]);
        expect(state['300']).toEqual(data.photos[2]);
        expect(state['400']).toEqual(data.photos[3]);
      });

      it('should replace existing photos with ones from item in action payload', () => {
        const state = photosIndex(dummyIndex, actions.allItems(data.items));

        expect(state['100'].original).not.toEqual(dummyIndex['100'].original);
      });
    });

    describe('ITEM_DATA action', () => {
      it('should add all photos from item', () => {
        const state = photosIndex(null, actions.item(data.items[0]));

        expect(Object.keys(state)).toHaveLength(2);
        expect(Object.keys(state)).toEqual(['100', '300']);
        expect(state['100']).toEqual(data.photos[0]);
        expect(state['300']).toEqual(data.photos[2]);
      });

      it('should replace existing items with ones from action payload', () => {
        const state = photosIndex(dummyIndex, actions.item(data.items[0]));

        expect(state['100'].original).not.toEqual(dummyIndex['100'].original);
      });
    });
  });
});
