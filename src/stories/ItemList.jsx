import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import ItemList from '../components/ItemList';

import data from './items.data';

storiesOf('ItemList', module)
  .add('default', () => (<ItemList
    goToItem={() => linkTo('Item', 'default')}
    items={data}
  />));
