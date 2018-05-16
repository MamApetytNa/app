import React from 'react';

import { storiesOf } from '@storybook/react';

import Sidebar from '../components/MainMenu/Sidebar';
import Header from '../components/MainMenu/Header';

function Link({ children, ...props }) {
  return (<a {...props}>{children}</a>);
}

storiesOf('MainMenu', module)
  .add('sidebar', () => (<Sidebar link={Link} />))
  .add('header', () => (<Header link={Link} />));
