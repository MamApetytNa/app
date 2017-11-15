import React from 'react';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import SizeChooser from './SizeChooser';
import TimeChooser from './TimeChooser';

const styles = {
  nextButton: {
    width: '100%',
  },
};

const texts = {
  NEXT: 'Zamów',
};

export default withStyles(styles)(({ classes, ...props }) => (
  <Card>
    <CardContent>
      <Grid container>
        <Grid item xs={12}>
          <SizeChooser sizes={props.sizes} />
        </Grid>

        <Grid item xs={12}>
          <TimeChooser />
        </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
        raised
        color="primary"
        classes={{ root: classes.nextButton }}
      >
        {texts.NEXT}
      </Button>
    </CardActions>
  </Card>
));
