import { withTheme } from 'material-ui/styles';
import { pipe } from 'ramda';
import React from 'react';
import { withSizes } from 'react-sizes';

import Full from './Full';
import Lite from './Lite';

function Map({ isLite, ...props }) {
  if (isLite) {
    return <Lite {...props} />;
  }

  return <Full {...props} />;
}

export default pipe(
  withSizes(({ width }, { theme }) => ({ isLite: width < theme.breakpoints.values.sm })),
  withTheme(),
)(Map);
