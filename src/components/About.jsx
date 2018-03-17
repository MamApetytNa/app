import classNames from 'classnames';
import React from 'react';
import { withStyles } from 'material-ui/styles';

import Markdown from './Markdown';

const styles = theme => ({
  root: {
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
