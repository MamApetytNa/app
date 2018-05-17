import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

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

function Loader({ className, classes }) {
  return (
    <div className={classNames(classes.root, className)}>
      <CircularProgress className={classes.loader} size={64} />
    </div>
  );
}

export default withStyles(styles)(Loader);
