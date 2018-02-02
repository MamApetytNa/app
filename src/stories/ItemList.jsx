/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import ItemList from '../components/ItemList';

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

storiesOf('ItemList', module)
  .add('default', () => (<ItemList
    items={getItems()}
    itemLink={ItemLink}
  />))
  .add('with tag', () => (<ItemList
    tag="something nice"
    items={getItems()}
    itemLink={ItemLink}
  />));
