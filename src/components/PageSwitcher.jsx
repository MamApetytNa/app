import { pick } from 'ramda';
import { connect } from 'react-redux';
import universal from 'react-universal-component';

import Loader from './Loader';

const PageSwitcher = universal(({ page, pages }) => import(`../pages/${pages[page]}`), {
  loading: Loader,
});

export default connect(pick(['page', 'pages']))(PageSwitcher);
