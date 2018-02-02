import withProps from 'decorate-component-with-props';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem, goToItemList } from '../actions';
import { resolveFeatured } from '../selectors';
import Home from '../components/Home';

function ItemLink({ id, children, ...props }) {
  return <Link to={goToItem(id)} {...props}>{children}</Link>;
}

function MoreLink({ children, id, ...props }) {
  return <Link to={goToItemList(id)} {...props}>{children}</Link>;
}

function select({
  featured,
  itemsIndex,
  photosIndex,
  tagsIndex,
}) {
  const lists = resolveFeatured({ itemsIndex, photosIndex, tagsIndex }, featured);

  return { lists };
}

export default connect(select)(withProps(Home, { itemLink: ItemLink, moreLink: MoreLink }));
