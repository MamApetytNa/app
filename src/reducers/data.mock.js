export const tags = [{
  id: '10',
  label: 'Tag 10',
}, {
  id: '20',
  label: 'Tag 20',
}, {
  id: '30',
  label: 'Tag 30',
}, {
  id: '40',
  label: 'Tag 40',
}, {
  id: '50',
  label: 'Tag 50',
}, {
  id: '60',
  label: 'Tag 60',
}];

export const photos = [{
  id: '100',
  original: 'http://some.photo/100.jpg',
}, {
  id: '200',
  original: 'http://some.photo/200.jpg',
}, {
  id: '300',
  original: 'http://some.photo/300.jpg',
}, {
  id: '400',
  original: 'http://some.photo/400.jpg',
}, {
  id: '500',
  original: 'http://some.photo/500.jpg',
}, {
  id: '600',
  original: 'http://some.photo/600.jpg',
}];

export const items = [{
  id: '1',
  name: 'Item 1',
  tags: [tags[0], tags[2]],
  photos: [photos[0], photos[2]],
  thumbnail: photos[0],
}, {
  id: '2',
  name: 'Item 2',
  tags: [tags[1], tags[3]],
  photos: [photos[1], photos[3]],
  thumbnail: photos[1],
}, {
  id: '3',
  name: 'Item 3',
  tags: [tags[1], tags[2]],
  photos: [photos[1], photos[2]],
  thumbnail: photos[1],
}, {
  id: '4',
  name: 'Item 4',
  tags: [tags[1], tags[3]],
  photos: [photos[1], photos[3]],
  thumbnail: photos[1],
}, {
  id: '5',
  name: 'Item 5',
  tags: [tags[2], tags[3]],
  photos: [photos[2], photos[3]],
  thumbnail: photos[2],
}, {
  id: '6',
  name: 'Item 6',
  tags: [],
  photos: [],
  thumbnail: null,
}];

export const featured = [{
  id: '10',
  name: 'Featured items 1',
  tag: tags[4],
  items: items.slice(0, 2),
}, {
  id: '20',
  name: 'Featured items 2',
  tag: tags[5],
  items: items.slice(2, 4),
}];
