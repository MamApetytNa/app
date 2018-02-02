import React from 'react';
import { pipe } from 'ramda';
import IconButton from 'material-ui/IconButton';
import { withStyles, withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import InfoIcon from 'material-ui-icons/Info';
import Typography from 'material-ui/Typography';

import { getSizes, getSrcSet } from '../components/Picture';
import Price from '../components/Price';

const texts = {
  SUBHEADING: 'Przeglądasz rzeczy oznaczone słowem ',
  SEE_ALL: 'zobacz wszystkie',
};

const styles = {
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
  tileImage: {
    top: 'auto',
    height: '100%',
    objectFit: 'cover',
    transform: 'none',
  },
  tileLink: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
};

function ItemList({
  classes,
  items = [],
  itemLink: ItemLink = () => {},
  listLink: ListLink = () => {},
  tag,
  theme,
}) {
  return (
    <div className={classes.root}>
      {tag
        ? (
          <Typography type="subheading">
            {texts.SUBHEADING}
            <strong>„{tag.label}”</strong>
            <small><ListLink>{texts.SEE_ALL}</ListLink></small>
          </Typography>
        )
        : null}
      <Grid container>{items.map(({
        id = '',
        minPrice = {},
        sizes = [],
        name = '',
        thumbnail = { square: '' },
        }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
            <ItemLink id={id} name={name} className={classes.tileLink}>
              <GridListTile
                component="span"
                classes={{ root: classes.tileRoot, tile: classes.tile }}
              >
                <img
                  srcSet={getSrcSet(thumbnail.square, 600)}
                  sizes={getSizes({
                    [theme.breakpoints.up('lg')]: '25vw',
                    [theme.breakpoints.up('md')]: '33vw',
                    [theme.breakpoints.up('sm')]: '50vw',
                    [theme.breakpoints.up('xs')]: '100vw',
                })}
                  alt={name}
                  className={classes.tileImage}
                />
                <GridListTileBar
                  title={name}
                  subtitle={<Price {...minPrice} {...(sizes.length > 1 ? null : { prefix: '' })} color="inherit" />}
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
    </div>);
}

export default pipe(
  withStyles(styles),
  withTheme(),
)(ItemList);
