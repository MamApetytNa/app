import { withProps } from 'recompose';
import { pipe } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToOrder, goToItemList } from '../actions';
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
  })(location.payload.id || location.prev.payload.id);
}

export default pipe(
  connect(select, { goToItemList }),
  withProps({ orderLink: OrderLink }),
)(Item);
