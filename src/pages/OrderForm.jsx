import { identity } from 'ramda';
import { connect } from 'react-redux';

import OrderForm from '../components/OrderForm';

export default connect(identity)(OrderForm);
