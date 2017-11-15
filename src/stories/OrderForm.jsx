import React from 'react';

import { action, storiesOf } from '@storybook/react';

import OrderForm from '../components/OrderForm';

storiesOf('OrderForm', module)
  .add('default', () => <OrderForm onSubmit={action('Submit')} />);
