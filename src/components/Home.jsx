import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import Featured from './Featured';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
});

function Home({
  className,
  classes,
  itemLink,
  moreLink,
  lists = [],
}) {
  return (
    <Grid container className={classNames(classes.root, className)} spacing={16}>
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
