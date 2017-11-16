import classNames from 'classnames';
import React from 'react';

import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Price from './Price';
import Showcase from './Showcase';
import SizeChooser from './SizeChooser';
import TimeChooser from './TimeChooser';
import Tags from './Tags';

const styles = theme => ({
  root: {
    maxWidth: theme.spacing.unit * 96,
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
    },
  },
  showcase: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -theme.spacing.unit * 2,
      marginRight: -theme.spacing.unit * 2,
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
});

const texts = {
  ORDER: 'Zamów',
};

export default withStyles(styles)(({
  className,
  classes,
  description = '',
  minPrice = { value: 0, currency: 'PLN' },
  name = '',
  photos = [],
  tags,
  ...props
}) => (
  <Card className={classNames(className, classes.root)}>
    <CardHeader
      title={name}
      subheader={<Price
        {...minPrice}
        accent
        type="subheading"
      />}
    />
    <CardContent>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Showcase
            images={photos.map(url => ({ url, title: name }))}
            className={classes.showcase}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container className={classes.infoContainer}>
            <Grid item xs={12}>
              <Typography component="p">{description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Tags tags={tags} />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <SizeChooser sizes={props.sizes} />
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
                {texts.ORDER}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
));
