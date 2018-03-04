import { connect } from 'react-redux';

import { goToItemList } from '../actions';
import { resolveItem } from '../selectors';
import Item from '../components/Item';

function select({
  itemsIndex,
  tagsIndex,
  photosIndex,
  location,
  contact: { phone },
}) {
  const item = resolveItem({
    itemsIndex,
    tagsIndex,
    photosIndex,
  })(location.payload.id || location.prev.payload.id);

  return { ...item, phone };
}

export default connect(select, { goToItemList })(Item);
