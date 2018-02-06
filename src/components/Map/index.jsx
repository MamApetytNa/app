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

export default withSizes(({ width }) => ({ isLite: width < 600 }))(Map);
