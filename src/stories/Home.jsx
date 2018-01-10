/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Home from '../components/Home';

import { getFeatured } from '../data/sample';

function ItemLink({ name, ...props }) {
  return (
    <a
      onClick={linkTo('Item', name)}
      {...props}
    >{props.children}
    </a>
  );
}

function MoreLink(props) {
  return (
    <a
      onClick={linkTo('ItemList')}
      {...props}
    >{props.children}
    </a>
  );
}

storiesOf('Home', module)
  .add('default', () => (<Home
    lists={getFeatured()}
    itemLink={ItemLink}
    moreLink={MoreLink}
  />));
