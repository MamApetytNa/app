import React from 'react';

import loremIpsum from 'lorem-ipsum';
import { storiesOf } from '@storybook/react';

import Item from '../components/Item';

import data from './items.data';

storiesOf('Item', module)
  .add('Sernik karmelowy', () => <Item {...data[0]} />)
  .add('Ciasto dyniowe', () => <Item {...data[1]} />)
  .add('Tarta ze śliwkami', () => <Item {...data[2]} />)
  .add('Ciasto z gruszkami', () => <Item {...data[3]} />)
  .add('Quite a long description', () => <Item {...data[3]} description={loremIpsum({ count: 10 })} />);
