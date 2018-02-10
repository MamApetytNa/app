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
  square: 'http://via.placeholder.com/800x800/E8117F/FFFFFF?text=OMG',
}, {
  id: '101',
  square: 'http://via.placeholder.com/800x800/7fe811/FFFFFF?text=OMG',
}, {
  id: '102',
  square: 'http://via.placeholder.com/800x800/7a11e8/FFFFFF?text=OMG',
}, {
  id: '103',
  square: 'http://via.placeholder.com/800x800/11e87a/FFFFFF?text=OMG',
}, {
  id: '104',
  square: 'http://via.placeholder.com/800x1200/AAAAAA/FFFFFF?text=W%0AT%0AF',
}, {
  id: '105',
  square: 'http://via.placeholder.com/1200x800/AAAAAA/FFFFFF?text=W%20T%20F',
}, {
  id: '106',
  square: 'http://olgamawypieki.imgix.net/images/test_t.jpg',
}];

const photos = [{
  id: '200',
  original: 'https://picsum.photos/600/900?image=0',
  square: 'https://picsum.photos/600/600?image=0',
}, {
  id: '201',
  original: 'https://picsum.photos/600/900?image=2',
  square: 'https://picsum.photos/600/600?image=2',
}, {
  id: '202',
  original: 'https://picsum.photos/600/900?image=4',
  square: 'https://picsum.photos/600/600?image=4',
}, {
  id: '203',
  original: 'http://olgamawypieki.imgix.net/images/test.jpg',
  square: 'http://olgamawypieki.imgix.net/images/test_t.jpg',
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
}, {
  id: '7',
  name: 'Auto scaled image',
  description,
  thumbnail: thumbnails[6],
  photos: [thumbnails[6]].concat(photos),
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

const contactInfo = {
  name: 'A place with a pretty long name, it should be two lines at least',
  address: {
    street: 'The Elm Street 666/11',
    zip: '12-345',
    city: 'The city',
  },
  taxId: '123-456-78-90',
  phone: '123 456 789',
  email: 'example@domain.com',
  social: {
    facebook: 'exampleaccount',
    instagram: 'exampleaccount',
  },
  openHours: [{
    label: 'Tue - Fri',
    value: '12:00 - 18:00',
  }, {
    label: 'Sat',
    value: '10:00 - 14:00',
  }, {
    label: 'Sun - Mon',
    value: 'Odpoczywam :)',
  }],
};

export function getItem(id) {
  return items[id];
}

export function getItems() {
  return items;
}

export function getFeatured() {
  return featured;
}

export function getContactInfo() {
  return contactInfo;
}
