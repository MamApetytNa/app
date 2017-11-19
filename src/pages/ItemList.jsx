import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem } from '../actions';
import ItemList from '../components/ItemList';

function ItemLink({ id, children }) {
  return <Link to={goToItem(id)}>{children}</Link>;
}

export default connect(({ itemList }) => ({ items: itemList }))(props => (
  <ItemList
    {...props}
    itemLink={ItemLink}
  />
));
