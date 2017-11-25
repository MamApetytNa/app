import withProps from 'decorate-component-with-props';
import { propOr } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToOrder } from '../actions';
import Item from '../components/Item';

function OrderLink({ id, children, ...props }) {
  return <Link to={goToOrder(id)} {...props}>{children}</Link>;
}

export default connect(propOr({}, 'item'))(withProps(Item, { orderLink: OrderLink }));
