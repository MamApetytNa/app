import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import React from 'react';

const texts = {
  TAX_ID: 'NIP',
  IBAN: 'Konto bankowe',
};

const styles = theme => ({
  root: {
    fontStyle: 'normal',
  },
  paragraph: {
    color: 'inherit',
  },
  iban: {
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
  iban = '',
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
      {taxId && (
        <Typography className={classes.taxId}>
          <strong>{texts.TAX_ID}:</strong> {taxId}
        </Typography>
      )}
      {iban && (
        <Typography className={classes.iban}>
          <strong>{texts.IBAN}:</strong><br />{iban}
        </Typography>
      )}
    </div>
  );
}

export default withStyles(styles)(ContactInfo);
