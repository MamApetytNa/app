import withProps from 'decorate-component-with-props';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem } from '../actions';
import ItemList from '../components/ItemList';

function ItemLink({ id, children, ...props }) {
  return <Link to={goToItem(id)} {...props}>{children}</Link>;
}

function select({ allItems, itemsIndex }) {
  return {
    items: allItems.map(id => itemsIndex[id]),
  };
}

export default connect(select)(withProps(ItemList, { itemLink: ItemLink }));
