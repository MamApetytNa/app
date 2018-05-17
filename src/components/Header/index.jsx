import { withTheme } from '@material-ui/core/styles';
import { pipe } from 'ramda';
import React from 'react';
import { withSizes } from 'react-sizes';

import Desktop from './Desktop';
import Mobile from './Mobile';

function Header({ isMobile, ...props }) {
  return isMobile ? <Mobile {...props} /> : <Desktop {...props} />;
}

export default pipe(
  withSizes(({ width }, { theme }) => ({
    isMobile: width < theme.breakpoints.values.sm,
  })),
  withTheme(),
)(Header);
