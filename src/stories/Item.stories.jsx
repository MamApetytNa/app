import React from 'react';

import { storiesOf } from '@storybook/react';

import Item from '../components/Item';

import { getItem } from '../data/sample';

storiesOf('Item', module)
  .add('Default', () => (<Item {...getItem(0)} />))
  .add('Quite long name', () => (<Item {...getItem(1)} />))
  .add('Very long name', () => (<Item {...getItem(2)} />))
  .add('Long description', () => (<Item {...getItem(3)} />))
  .add('Vertical image', () => (<Item {...getItem(4)} />))
  .add('Horizontal image', () => (<Item {...getItem(5)} />))
  .add('Autoscaled image', () => (<Item {...getItem(6)} />));
