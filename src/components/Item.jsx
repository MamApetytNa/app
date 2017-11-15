import React from 'react';

import Grid from 'material-ui/Grid';

import ItemIntro from './ItemIntro';
import SizeChooser from './SizeChooser';
import TimeChooser from './TimeChooser';

export default function Item(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ItemIntro {...props} />
      </Grid>
      <Grid item xs={12}>
        <SizeChooser sizes={props.sizes} />
      </Grid>
      <Grid item xs={12}>
        <TimeChooser />
      </Grid>
    </Grid>
  );
}
