import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { pipe } from 'ramda';
import React from 'react';

import { getPhotoUrl, getSizes, getAutoSrcSet } from '../utils/pic';

import MessengerButton from './MessengerButton';
import PhoneButton from './PhoneButton';
import Price from './Price';
import Showcase from './Showcase';
import SizeChooser from './SizeChooser';
import Tags from './Tags';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2,
    maxWidth: theme.breakpoints.values.md,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  showcase: {
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  infoContainer: {
    height: '100%',
  },
  ctaContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginTop: -theme.spacing.unit,
    marginBottom: -theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      marginBottom: -2 * theme.spacing.unit,
    },
  },
  ctaButton: {
    marginTop: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.spacing.unit * 25,
    width: '100%',
  },
});

function Item({
  className,
  classes,
  description = '',
  minPrice = { value: 0, currency: 'PLN' },
  sizes = [],
  name = '',
  goToItemList = () => {},
  phone = '',
  photos = [],
  tags = [],
  theme,
}) {
  return (
    <Card className={classNames(classes.root, className)}>
      <CardHeader
        title={name}
        subheader={<Price
          {...minPrice}
          accent
          variant="subheading"
          {...(sizes.length > 1 ? null : { prefix: '' })}
        />}
      />
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Showcase
              images={photos.map(photo => ({
                ...photo,
                src: getPhotoUrl(photo, 'square', { w: 'auto', dpr: 'auto' }),
                srcSet: getAutoSrcSet(photo, 'square', 600),
                title: name,
              }))}
              className={classes.showcase}
              imageProps={{
                sizes: getSizes({
                  [theme.breakpoints.up('sm')]: '360px',
                  [theme.breakpoints.up('xs')]: '100vw',
                }),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container className={classes.infoContainer} spacing={16}>
              <Grid item xs={12}>
                <Typography component="p">{description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Tags tags={tags} onClick={goToItemList} />
              </Grid>
              <Grid item xs={12}>
                <SizeChooser sizes={sizes} />
              </Grid>
              <Grid item xs={12} className={classes.ctaContainer}>
                <MessengerButton
                  className={classes.ctaButton}
                  id="olgamawypieki"
                />
                <PhoneButton
                  className={classes.ctaButton}
                  variant="raised"
                  number={phone}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default pipe(
  withStyles(styles),
  withTheme(),
)(Item);
