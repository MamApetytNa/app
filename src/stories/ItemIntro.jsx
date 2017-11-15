import React from 'react';

import { storiesOf } from '@storybook/react';

import ItemIntro from '../components/ItemIntro';

import data from './items.data';

storiesOf('Item intro', module)
  .add('default', () => <ItemIntro {...data[0]} />)
  .add('quite long name', () => <ItemIntro {...data[0]} name="Sernik karmelowy z orzechami i snickersem" />);
