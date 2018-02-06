import React from 'react';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Featured from './Featured';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
});

function Home({
  classes,
  itemLink,
  moreLink,
  lists = [],
}) {
  return (
    <Grid container className={classes.root}>
      {lists.map(({ id, name, items }) => (
        <Grid item key={name} xs={12}>
          <Featured
            id={id}
            name={name}
            items={items}
            itemLink={itemLink}
            moreLink={moreLink}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(Home);
