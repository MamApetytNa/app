import React from 'react';

import { withStyles } from 'material-ui/styles';

import Map from './Map';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit * 2,
  },
});

function Footer({ classes }) {
  return (
    <div className={classes.root}>
      <Map />
    </div>
  );
}

export default withStyles(styles)(Footer);
