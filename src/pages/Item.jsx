import withProps from 'decorate-component-with-props';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToOrder } from '../actions';
import { resolveItem } from '../selectors';
import Item from '../components/Item';

function OrderLink({ id, children, ...props }) {
  return <Link to={goToOrder(id)} {...props}>{children}</Link>;
}

function select({
  itemsIndex,
  tagsIndex,
  photosIndex,
  location,
}) {
  return resolveItem({
    itemsIndex,
    tagsIndex,
    photosIndex,
  })(location.payload.id);
}

export default connect(select)(withProps(Item, { orderLink: OrderLink }));
