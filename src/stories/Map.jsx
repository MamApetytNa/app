import React from 'react';

import { storiesOf } from '@storybook/react';

import Map from '../components/Map';
import Full from '../components/Map/Full';
import LiteMap from '../components/Map/Lite';

storiesOf('Map', module)
  .add('default', () => (<Map />))
  .add('full', () => (<Full />))
  .add('lite', () => (<LiteMap />));
