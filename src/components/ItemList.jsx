import React from 'react';

import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import InfoIcon from 'material-ui-icons/Info';

import Price from '../components/Price';

const styles = theme => ({
  root: {
    maxWidth: theme.spacing.unit * 96,
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    },
  },
  tileRoot: {
    cursor: 'pointer',
    display: 'block',
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
  tileLink: {
    display: 'block',
  },
});

function ItemList({
  classes,
  items = [],
  itemLink: ItemLink = () => {},
}) {
  return (
    <Grid container className={classes.root}>{items.map(({
      id = '',
      minPrice = {},
      name = '',
      thumbnail = '',
    }) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
        <ItemLink id={id} name={name} className={classes.tileLink}>
          <GridListTile
            component="span"
            classes={{ root: classes.tileRoot, tile: classes.tile }}
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
        </ItemLink>
      </Grid>
    ))}
    </Grid>
  );
}

export default withStyles(styles)(ItemList);
