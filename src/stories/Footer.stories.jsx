import React from 'react';

import { storiesOf } from '@storybook/react';

import Footer from '../components/Footer/Footer';

import { getContactInfo } from '../data/sample';

storiesOf('Footer', module)
  .add('default', () => (<Footer contact={getContactInfo()} />));
