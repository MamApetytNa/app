import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import { pipe } from 'ramda';
import React from 'react';

import { getSizes, getAutoSrcSet, getPhotoUrl } from '../utils/pic';
import Price from '../components/Price';

const texts = {
  SUBHEADING: 'Filtr: ',
  SEE_ALL: 'zobacz wszystkie ciasta',
};

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
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
    width: '100%',
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
  tagHeading: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  seeAll: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

function ItemList({
  className,
  classes,
  items = [],
  itemLink: ItemLink = () => {},
  goToItemList = () => {},
  tag,
  theme,
}) {
  return (
    <div className={classNames(classes.root, className)}>
      {tag && (
        <Typography className={classes.tagHeading}>
          {texts.SUBHEADING}
          <Chip
            component="span"
            label={tag}
            onDelete={goToItemList}
          />
        </Typography>
      )}
      <Grid container spacing={16}>{items.map(({
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
                  src={getPhotoUrl(thumbnail, 'square', { w: 'auto', dpr: 'auto' })}
                  srcSet={getAutoSrcSet(thumbnail, 'square', 600)}
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
      {tag && (
        <Button
          className={classes.seeAll}
          onClick={goToItemList}
        >
          {texts.SEE_ALL}
        </Button>
      )}
    </div>);
}

export default pipe(
  withStyles(styles),
  withTheme(),
)(ItemList);
