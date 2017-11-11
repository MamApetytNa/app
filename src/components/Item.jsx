import React from 'react';

import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Showcase from './Showcase';

const styles = {
  media: {
    height: 200,
  },
  card: {
    maxWidth: 345,
  },
};

export default withStyles(styles)(({
  classes,
  description,
  name,
  photos,
}) => (
  <Card className={classes.card}>
    <Showcase images={photos.map(url => ({ url, title: name }))} />
    <CardContent>
      <Typography type="headline" component="h2">{name}</Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
  </Card>
));
