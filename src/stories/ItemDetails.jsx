import React from 'react';

import { storiesOf } from '@storybook/react';

import ItemDetails from '../components/ItemDetails';

import data from './items.data';

storiesOf('Item details', module)
  .add('default', () => <ItemDetails {...data[0]} />);
