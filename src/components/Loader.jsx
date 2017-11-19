import React from 'react';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  root: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loader: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
};

function Loader({ classes }) {
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loader} size={64} />
    </div>
  );
}

export default withStyles(styles)(Loader);
