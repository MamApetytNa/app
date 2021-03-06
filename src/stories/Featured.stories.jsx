/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Featured from '../components/Featured';

import { getItems } from '../data/sample';

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

storiesOf('Featured', module)
  .add('default', () => (<Featured
    name="Featured items"
    items={getItems().slice(0, 4)}
    itemLink={ItemLink}
    moreLink={MoreLink}
  />));
