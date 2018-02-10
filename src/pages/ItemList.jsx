import { withProps } from 'recompose';
import { nAry, pathOr, pipe } from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { goToItem, goToItemList } from '../actions';
import { resolveItem, selectTagParam } from '../selectors';
import ItemList from '../components/ItemList';

function ItemLink({ id, children, ...props }) {
  return <Link to={goToItem(id)} {...props}>{children}</Link>;
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
  const tag = pathOr('', [selectTagParam({ location }), 'label'], tagsIndex);

  return { tag, items };
}

export default pipe(
  connect(select, {
    goToItemList: nAry(0, goToItemList),
  }),
  withProps({ itemLink: ItemLink }),
)(ItemList);
