import classNames from 'classnames';
import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles, withTheme } from 'material-ui/styles';
import { pipe } from 'ramda';
import React from 'react';

import { getSizes, getAutoSrcSet } from '../utils/pic';
import Price from '../components/Price';
import Showcase from '../components/Showcase';
import SizeChooser from '../components/SizeChooser';
import TimeChooser from '../components/TimeChooser';
import Tags from '../components/Tags';
import { rules } from '../utils/css';

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
    textAlign: 'center',
  },
  cta: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.spacing.unit * 24,
    width: '100%',
  },
  orderLink: {
    ...rules.unstyledLink,
    ...rules.absoluteFill,
    ...rules.flexCenter,
  },
});

const texts = {
  ORDER: 'Zamów',
};

function Item({
  className,
  classes,
  description = '',
  minPrice = { value: 0, currency: 'PLN' },
  sizes = [],
  name = '',
  orderLink: OrderLink = () => {},
  goToItemList = () => {},
  photos = [],
  tags,
  theme,
}) {
  return (
    <Card className={classNames(classes.root, className)}>
      <CardHeader
        title={name}
        subheader={<Price
          {...minPrice}
          accent
          type="subheading"
          {...(sizes.length > 1 ? null : { prefix: '' })}
        />}
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Showcase
              images={photos.map(photo => ({
                ...photo,
                src: photo.square,
                srcSet: getAutoSrcSet(photo.square, 600),
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
            <Grid container className={classes.infoContainer}>
              <Grid item xs={12}>
                <Typography component="p">{description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Tags tags={tags} onClick={goToItemList} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <SizeChooser sizes={sizes} />
                  </Grid>
                  <Grid item xs={12}>
                    <TimeChooser />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.ctaContainer}>
                <Button
                  raised
                  color="primary"
                  classes={{ root: classes.cta }}
                >
                  <OrderLink className={classes.orderLink}>
                    {texts.ORDER}
                  </OrderLink>
                </Button>
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
