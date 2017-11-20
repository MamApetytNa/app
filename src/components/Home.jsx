import React from 'react';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Featured from './Featured';

const styles = {
  listsContainer: {

  },
};

function Home({
  classes,
  itemLink,
  moreLink,
  lists = [],
  // moreLink: MoreLink = () => {},
}) {
  return (
    <Grid container className={classes.listsContainer}>
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
