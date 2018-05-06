import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import React from 'react';

const texts = {
  TAX_ID: 'NIP',
};

const styles = theme => ({
  root: {
    fontStyle: 'normal',
  },
  paragraph: {
    color: 'inherit',
  },
  name: {
    fontWeight: 'bold',
    color: 'inherit',
    maxWidth: '16em',
  },
  taxId: {
    color: 'inherit',
    marginTop: theme.spacing.unit,
  },
});

function ContactInfo({
  address = {},
  classes = {},
  className = '',
  name = '',
  taxId = '',
}) {
  return (
    <div className={classNames(classes.root, className)}>
      <Typography className={classes.paragraph}>
        <strong>{name}</strong><br />
        {address.street}<br />
        {address.zip}&nbsp;{address.city}
      </Typography>
      <Typography className={classes.taxId}>
        {texts.TAX_ID}: {taxId}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(ContactInfo);
