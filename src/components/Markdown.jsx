import classNames from 'classnames';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import { createRenderer } from '../utils/markdown';

const styles = theme => ({
  paragraph: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

const render = createRenderer({
  heading({ key, children, depth }) {
    const variant = ({
      1: 'headline',
      2: 'title',
      3: 'subheading',
    })[depth] || 'subheading';
    return <Typography variant={variant} key={key}>{children}</Typography>;
  },
  paragraph({ classes, key, children }) {
    return <Typography variant="body1" key={key} className={classes.paragraph}>{children}</Typography>;
  },
});

function Markdown({ className, classes, ast }) {
  return (
    <div className={classNames(className, classes.root)}>
      {render(ast, { classes })}
    </div>
  );
}

export default withStyles(styles)(Markdown);
