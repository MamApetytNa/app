import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Price from './Price';
import Showcase from './Showcase';

const styles = {
  media: {
    height: 200,
  },
  title: {
    flexShrink: 1,
  },
  price: {
    '&:not(#\\20)': { // dirty hack to increase selector specificity
      paddingTop: 10, // align with title
    },
  },
  nextStep: {
    width: '100%',
  },
};

export default withStyles(styles)(({
  classes = {},
  description = '',
  minPrice = { value: 0, currency: 'PLN' },
  name = '',
  photos = [],
}) => (
  <Card>
    <Showcase images={photos.map(url => ({ url, title: name }))} />
    <CardContent>
      <Grid
        container
        justify="space-between"
        wrap="nowrap"
      >
        <Grid item classes={{ typeItem: classes.title }}>
          <Typography component="h2" type="title" paragraph>{name}</Typography>
        </Grid>
        <Grid item classes={{ typeItem: classes.price }}>
          <Price
            {...minPrice}
            accent
            type="subheading"
            align="right"
          />
        </Grid>
      </Grid>
      <Typography component="p">{description}</Typography>
    </CardContent>
  </Card>
));
