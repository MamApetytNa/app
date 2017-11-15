import React from 'react';

import Grid from 'material-ui/Grid';

import ItemIntro from './ItemIntro';
import ItemDetails from './ItemDetails';

export default function Item({ classes, ...props }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ItemIntro {...props} />
      </Grid>
      <Grid item xs={12}>
        <ItemDetails {...props} />
      </Grid>
    </Grid>
  );
}
