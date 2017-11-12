import React from 'react';

import { storiesOf } from '@storybook/react';

import Item from '../components/Item';

import data from './items.data';

storiesOf('Item', module)
  .add('default', () => <Item {...data[0]} />)
  .add('quite long name', () => <Item {...data[0]} name="Sernik karmelowy z orzechami i snickersem" />);
