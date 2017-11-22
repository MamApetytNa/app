/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Home from '../components/Home';

import data from '../data';

function withTag(tag, items) {
  return items.filter(({ tags }) => tags.find(({ label }) => label === tag));
}

const lists = [
  {
    name: 'Na jesień',
    items: withTag('jesień', data),
  },
  {
    name: 'Z orzechami',
    items: withTag('orzechy', data),
  },
  {
    name: 'Ze śliwkami',
    items: withTag('śliwki', data),
  },
];

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
    lists={lists}
    itemLink={ItemLink}
    moreLink={MoreLink}
  />));
