import { pick } from 'ramda';
import { connect } from 'react-redux';

import Contact from '../components/Contact';

export default connect(pick(['contact']))(Contact);
