import React from 'react';

import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Showcase from './Showcase';

import Price from './Price';

const styles = {
  media: {
    height: 200,
  },
  card: {
    maxWidth: 345,
  },
  title: {
    flexShrink: 1,
  },
  price: {
    '&:not(#\\20)': { // dirty hack to increase selector specificity
      paddingTop: 10, // align with title
    },
  },
  order: {
    width: '100%',
  },
};

const texts = {
  ORDER: 'Zamów',
};

export default withStyles(styles)(({
  classes = {},
  description = '',
  minPrice = { value: 0, currency: 'PLN' },
  name = '',
  photos = [],
}) => (
  <Card className={classes.card}>
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
    <CardActions>
      <Button color="primary" classes={{ root: classes.order }}>{texts.ORDER}</Button>
    </CardActions>
  </Card>
));
