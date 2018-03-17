import { connect } from 'react-redux';

import About from '../components/About';

export default connect(({ about: content }) => ({ content }))(About);
