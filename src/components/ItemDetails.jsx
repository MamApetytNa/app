import React from 'react';

import Card, { CardContent, CardHeader } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

import SizeChooser from './SizeChooser';
import TimeChooser from './TimeChooser';

const styles = {
};

const texts = {
  CHOOSE_SIZE: 'Wybierz rozmiar',
  CHOOSE_TIME: 'Wybierz czas',
};

export default withStyles(styles)(({
  sizes = [],
}) => (
  <div>
    <Card>
      <CardHeader
        subheader={texts.CHOOSE_SIZE}
      />
      <CardContent>
        <SizeChooser sizes={sizes} />
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        subheader={texts.CHOOSE_TIME}
      />
      <CardContent>
        <TimeChooser />
      </CardContent>
    </Card>
  </div>
));
