export default {
  id: '1234',
  url: '/sernik-karmelowy-1234',
  name: 'Sernik karmelowy',
  description: 'Kremowy do granic, słodki i słony jednocześnie, ociekający karmelem, obsypany orzeszkami sernik ze snickersami.',
  thumbnail: 'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/fr/cp0/e15/q65/22555760_1969133643327893_4732118756128153071_o.jpg?efg=eyJpIjoidCJ9&oh=d675a0489c9f17aeda19155e8817c244&oe=5A9C2DC8',
  photos: [
    'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/22550473_1969133646661226_8527898888874165392_o.jpg?oh=194647284787cdae70080655a84f71e4&oe=5A688376',
    'https://scontent-amt2-1.xx.fbcdn.net/v/t31.0-8/22555760_1969133643327893_4732118756128153071_o.jpg?oh=2aedbc1ebc67ca627f7b30ed2c2aad57&oe=5AAA6A7A',
  ],
  minPrice: {
    value: 80,
    currency: 'PLN',
  },
  sizes: [{
    price: {
      value: 80,
      currency: 'PLN',
    },
    slices: 8,
    diameter: {
      value: 18,
      unit: 'cm',
    },
    weight: {
      value: 1.5,
      unit: 'kg',
    },
  }, {
    price: {
      value: 100,
      currency: 'PLN',
    },
    slices: 12,
    diameter: {
      value: 22,
      unit: 'cm',
    },
    weight: {
      value: 2,
      unit: 'kg',
    },
  }, {
    price: {
      value: 120,
      currency: 'PLN',
    },
    slices: 16,
    diameter: {
      value: 24,
      unit: 'cm',
    },
    weight: {
      value: 2.5,
      unit: 'kg',
    },
  }],
  features: {
    glutenFree: [true, false],
    lactoseFree: false,
    nutsFree: false,
    vegan: false,
  },
  tags: [{
    id: 1234,
    label: 'sernik',
  }, {
    id: 3456,
    label: 'karmel',
  }, {
    id: 5678,
    label: 'orzeszki ziemne',
  }],
};
