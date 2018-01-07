import React from 'react';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

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
}) {
  return (
    <GridListTile
      key={id}
      component="div"
      classes={{ root: classes.tileRoot, tile: classes.tile }}
    >
      <ItemLink name={name} id={id} className={classes.tileLink}>
        <img src={thumbnail.url} alt={name} className={classes.tileImage} />
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
}) {
  return (
    <div className={classes.root}>
      <Typography component="h2" type="title" className={classes.header}>
        {name}
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Item {...items[0]} classes={classes} itemLink={itemLink} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={0} >
            {items.slice(1).map(props => (
              <Grid item xs={6} key={props.id}>
                <Item {...props} classes={classes} itemLink={itemLink} />
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

export default withStyles(styles)(Featured);
