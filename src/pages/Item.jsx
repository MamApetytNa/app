import withProps from 'decorate-component-with-props';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToOrder } from '../actions';
import Item from '../components/Item';

function OrderLink({ id, children, ...props }) {
  return <Link to={goToOrder(id)} {...props}>{children}</Link>;
}

function select({ itemsIndex, location }) {
  return itemsIndex[location.payload.id] || {};
}

export default connect(select)(withProps(Item, { orderLink: OrderLink }));
