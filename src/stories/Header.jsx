import React from 'react';

import { storiesOf } from '@storybook/react';

import Header from '../components/Header';
import DesktopHeader from '../components/Header/Desktop';
import MobileHeader from '../components/Header/Mobile';

function Link({ children, ...props }) {
  return (<a {...props}>{children}</a>);
}

storiesOf('Header', module)
  .add('default', () => (<Header homeLink={Link} menuLink={Link} />))
  .add('mobile', () => (<MobileHeader homeLink={Link} menuLink={Link} />))
  .add('desktop', () => (<DesktopHeader homeLink={Link} menuLink={Link} />));
