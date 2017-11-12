import React from 'react';

import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import InfoIcon from 'material-ui-icons/Info';

import Price from './Price';

const styles = {
  root: {
    cursor: 'pointer',
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      height: 0,
      paddingBottom: '100%',
    },
  },
  tile: {
    position: 'absolute',
  },
};

export default withStyles(styles)(({ goToItem, classes, items }) => (
  <Grid container>{items.map(({
    id,
    minPrice,
    name,
    thumbnail,
  }) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
      <GridListTile
        component="div"
        classes={classes}
        onClick={goToItem(id)}
      >
        <img src={thumbnail} alt={name} />
        <GridListTileBar
          title={name}
          subtitle={<Price {...minPrice} color="inherit" />}
          actionIcon={
            <IconButton>
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>
    </Grid>
  ))}
  </Grid>
));
