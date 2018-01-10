import loremIpsum from 'lorem-ipsum';

const description = loremIpsum({ count: 3 });
const sizes = [{
  price: {
    value: 50,
    currency: 'PLN',
  },
  slices: 10,
  diameter: {
    value: 20,
    unit: 'cm',
  },
  weight: {
    value: 1,
    unit: 'kg',
  },
},
{
  price: {
    value: 70,
    currency: 'PLN',
  },
  slices: 13,
  diameter: {
    value: 22,
    unit: 'cm',
  },
  weight: {
    value: 1.5,
    unit: 'kg',
  },
}];
const minPrice = [{
  value: 100,
  currency: 'PLN',
}];
const thumbnails = [{
  id: '100',
  url: 'http://via.placeholder.com/500x500/E8117F/FFFFFF?text=OMG',
}, {
  id: '101',
  url: 'http://via.placeholder.com/500x500/7fe811/FFFFFF?text=OMG',
}, {
  id: '102',
  url: 'http://via.placeholder.com/500x500/7a11e8/FFFFFF?text=OMG',
}, {
  id: '103',
  url: 'http://via.placeholder.com/500x500/11e87a/FFFFFF?text=OMG',
}, {
  id: '104',
  url: 'http://via.placeholder.com/500x800/AAAAAA/FFFFFF?text=W%0AT%0AF',
}, {
  id: '105',
  url: 'http://via.placeholder.com/800x500/AAAAAA/FFFFFF?text=W%20T%20F',
}];

const photos = [{
  id: '200',
  url: 'https://picsum.photos/500/500?image=0',
}, {
  id: '201',
  url: 'https://picsum.photos/500/500?image=2',
}, {
  id: '202',
  url: 'https://picsum.photos/500/500?image=4',
}];

const items = [{
  id: '1',
  name: 'Some item',
  description,
  thumbnail: thumbnails[0],
  photos: [thumbnails[0]].concat(photos),
  sizes,
  minPrice,
}, {
  id: '2',
  name: 'Some item with quite long name',
  description,
  thumbnail: thumbnails[1],
  photos: [thumbnails[1]].concat(photos),
  sizes,
  minPrice,
}, {
  id: '3',
  name: 'Some item with very very long name, I don\'t really know why so long',
  description,
  thumbnail: thumbnails[2],
  photos: [thumbnails[2]].concat(photos),
  sizes,
  minPrice,
}, {
  id: '4',
  name: 'Long description',
  description: loremIpsum({ count: 10 }),
  thumbnail: thumbnails[3],
  photos: [thumbnails[3]].concat(photos),
  sizes,
  minPrice,
}, {
  id: '5',
  name: 'Veritcal image',
  description,
  thumbnail: thumbnails[4],
  photos: [thumbnails[4]].concat(photos),
  sizes,
  minPrice,
}, {
  id: '6',
  name: 'Horizontal image',
  description,
  thumbnail: thumbnails[5],
  photos: [thumbnails[5]].concat(photos),
  sizes,
  minPrice,
}];

const featured = [{
  id: '10',
  name: 'Featured items',
  items: items.slice(0, 4),
}, {
  id: '20',
  name: 'A group of featured items',
  items: items.slice(0, 4),
}, {
  id: '30',
  name: 'A group of featured items with quite long name',
  items: items.slice(0, 4),
}];


export function getItem(id) {
  return items[id];
}

export function getItems() {
  return items;
}


export function getFeatured() {
  return featured;
}
