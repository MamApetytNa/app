import React from 'react';

import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

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
  thumbnail,
}) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image={thumbnail}
      title={name}
    />
    <CardContent>
      <Typography type="headline" component="h2">{name}</Typography>
      <Typography component="p">{description}</Typography>
    </CardContent>
  </Card>
));
