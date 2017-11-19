import { pick } from 'ramda';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

import Loader from './Loader';

function PageSwitcher({ page }) {
  return import(`../pages/${page}`);
}

export default connect(pick(['page']))(universal(PageSwitcher, {
  loading: Loader,
}));
