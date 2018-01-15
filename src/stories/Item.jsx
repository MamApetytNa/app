/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Item from '../components/Item';

import { getItem } from '../data/sample';

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
  .add('Default', () => (<Item
    {...getItem(0)}
    orderLink={OrderLink}
  />))
  .add('Quite long name', () => (<Item
    {...getItem(1)}
    orderLink={OrderLink}
  />))
  .add('Very long name', () => (<Item
    {...getItem(2)}
    orderLink={OrderLink}
  />))
  .add('Long description', () => (<Item
    {...getItem(3)}
    orderLink={OrderLink}
  />))
  .add('Vertical image', () => (<Item
    {...getItem(4)}
    orderLink={OrderLink}
  />))
  .add('Horizontal image', () => (<Item
    {...getItem(5)}
    orderLink={OrderLink}
  />))
  .add('Autoscaled image', () => (<Item
    {...getItem(6)}
    orderLink={OrderLink}
  />));
