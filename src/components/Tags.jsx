import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '&:last-child': {
      paddingBottom: theme.spacing.unit,
    },
  },
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function Tags({
  classes,
  tags = [],
  onClick = () => {},
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      {tags.map(({ id, url, label }) => (
        <Chip
          key={id}
          component="a"
          onClick={() => onClick(id)}
          href={url}
          label={label}
          className={classes.chip}
        />
      ))}
    </div>
  );
}

export default withStyles(styles)(Tags);
