/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import loremIpsum from 'lorem-ipsum';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Item from '../components/Item';

import data from '../items.data';

function OrderLink(props) {
  return (
    <a
      onClick={linkTo('OrderForm')}
      {...props}
    >{props.children}
    </a>
  );
}

storiesOf('Item', module)
  .add('Sernik karmelowy', () => <Item {...data[0]} orderLink={OrderLink} />)
  .add('Ciasto dyniowe', () => <Item {...data[1]} orderLink={OrderLink} />)
  .add('Tarta ze śliwkami', () => <Item {...data[2]} orderLink={OrderLink} />)
  .add('Ciasto z gruszkami', () => <Item {...data[3]} orderLink={OrderLink} />)
  .add('Quite a long description', () => <Item {...data[3]} description={loremIpsum({ count: 10 })} orderLink={OrderLink} />);
