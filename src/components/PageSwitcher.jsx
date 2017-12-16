import { pick } from 'ramda';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

import Loader from './Loader';

const PageSwitcher = universal(({ page }) => import(`../pages/${page}`), {
  loading: Loader,
});

export default connect(pick(['page']))(PageSwitcher);
