import { withStyles } from 'material-ui/styles';
import React from 'react';

import ContactInfo from '../ContactInfo';
import Map from '../Map';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit * 2,
  },
  contactInfo: {
    color: theme.palette.primary.contrastText,
  },
});

function Footer({ classes, contact }) {
  return (
    <div className={classes.root}>
      <ContactInfo
        {...contact}
        className={classes.contactInfo}
      />
      <Map />
    </div>
  );
}

export default withStyles(styles)(Footer);
