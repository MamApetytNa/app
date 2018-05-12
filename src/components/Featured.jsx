import React from 'react';
import { pipe } from 'ramda';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import { withStyles, withTheme } from 'material-ui/styles';

import { getSizes, getPhotoUrl, getAutoSrcSet } from '../utils/pic';
import { linearGradient, rgba } from '../utils/css';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
  },
  header: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
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
  tileLink: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  tileImage: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  tileTitle: {
    background: linearGradient(
      'to bottom',
      [rgba(0, 0, 0, 0.5), '0%'],
      [rgba(0, 0, 0, 0.2), '70%'],
      [rgba(0, 0, 0, 0), '100%'],
    ),
  },
  moreTile: {
    position: 'relative',
  },
  moreButton: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    textDecoration: 'none',
  },
});

function Item({
  classes,
  id,
  itemLink: ItemLink = () => {},
  name,
  thumbnail,
  size = 1,
  theme,
}) {
  return (
    <GridListTile
      key={id}
      component="div"
      classes={{ root: classes.tileRoot, tile: classes.tile }}
    >
      <ItemLink name={name} id={id} className={classes.tileLink}>
        <img
          src={getPhotoUrl(thumbnail, 'square', { w: 'auto', dpr: 'auto' })}
          srcSet={getAutoSrcSet(thumbnail, 'square', 600 * size)}
          sizes={getSizes({
            [theme.breakpoints.up('lg')]: `${size * 12}vw`,
            [theme.breakpoints.up('md')]: `${size * 16}vw`,
            [theme.breakpoints.up('sm')]: `${size * 25}vw`,
            [theme.breakpoints.up('xs')]: `${size * 50}vw`,
          })}
          alt={name}
          className={classes.tileImage}
        />
        <GridListTileBar
          title={name}
          titlePosition="top"
          className={classes.tileTitle}
        />
      </ItemLink>
    </GridListTile>
  );
}

const texts = {
  MORE: 'Więcej',
};

function Featured({
  classes,
  id = '',
  name = '',
  items = [],
  itemLink,
  moreLink: MoreLink = () => {},
  theme,
}) {
  return (
    <div className={classes.root}>
      <Typography component="h2" variant="title" className={classes.header}>
        {name}
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Item
            {...items[0]}
            classes={classes}
            itemLink={itemLink}
            theme={theme}
            size={2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            {items.slice(1).map(props => (
              <Grid item xs={6} key={props.id}>
                <Item
                  {...props}
                  classes={classes}
                  itemLink={itemLink}
                  theme={theme}
                />
              </Grid>
            ))}
            <Grid item xs={6} id="more" className={classes.moreTile}>
              <Typography component="p">
                <MoreLink id={id}>
                  <Button className={classes.moreButton}>
                    {texts.MORE}
                  </Button>
                </MoreLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default pipe(
  withStyles(styles),
  withTheme(),
)(Featured);
