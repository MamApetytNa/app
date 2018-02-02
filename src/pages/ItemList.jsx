import withProps from 'decorate-component-with-props';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem, goToItemList } from '../actions';
import { resolveItem, selectTagParam } from '../selectors';
import ItemList from '../components/ItemList';

function ItemLink({ id, children, ...props }) {
  return <Link to={goToItem(id)} {...props}>{children}</Link>;
}

function ListLink({ children, ...props }) {
  return <Link to={goToItemList()} {...props}>{children}</Link>;
}

function select({
  allItems,
  itemsIndex,
  photosIndex,
  tagsIndex,
  location,
}) {
  const items = allItems.map(resolveItem({
    itemsIndex,
    photosIndex,
    tagsIndex,
  }));
  const tag = tagsIndex[selectTagParam({ location })];

  return { tag, items };
}

export default connect(select)(withProps(ItemList, {
  itemLink: ItemLink,
  listLink: ListLink,
}));
