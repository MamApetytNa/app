import classNames from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Markdown from './Markdown';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function About({ classes, className, content }) {
  return (
    <Markdown ast={content} className={classNames(className, classes.root)} />
  );
}

export default withStyles(styles)(About);
