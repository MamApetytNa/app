import React from 'react';
import withProps from 'decorate-component-with-props';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem, goToItemList } from '../actions';
import Home from '../components/Home';

function ItemLink({ id, children, ...props }) {
  return <Link to={goToItem(id)} {...props}>{children}</Link>;
}

function MoreLink({ children, ...props }) {
  return <Link to={goToItemList()} {...props}>{children}</Link>;
}

const select = ({ featured }) => ({ lists: featured });

export default connect(select)(withProps(Home, { itemLink: ItemLink, moreLink: MoreLink }));
