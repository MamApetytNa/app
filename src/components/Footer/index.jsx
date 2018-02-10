import { pick } from 'ramda';
import { connect } from 'react-redux';

import Footer from './Footer';

export default connect(pick(['contact']))(Footer);
