import React from 'react';

import TextField from 'material-ui/TextField';

import { withStyles } from 'material-ui/styles';
import { path, pipe, tap } from 'ramda';

import withState from '../utils/with-state';

const styles = {

};

const texts = {
  LABEL: 'Planowany odbiór',
};

const HOUR = 60 * 60 * 1000;

const getInputValue = pipe(path(['target', 'value']), tap(console.log));

function fromNow(ms) {
  const date = new Date(Date.now() + ms);
  date.setSeconds(0);
  if (date.getMinutes() > 30) {
    date.setMinutes(0);
    date.setHours(date.getHours() + 1);
  } else {
    date.setMinutes(30);
  }
  return date.toISOString().slice(0, -5);
}

export default pipe(
  withState({
    state: {
      currentDateTime: fromNow(24 * HOUR),
    },
    actions: {
      onDateTimeChange: currentDateTime => ({ currentDateTime }),
    },
  }),
  withStyles(styles),
)(({
  classes,
  currentDateTime,
  onDateTimeChange,
}) => (
  <TextField
    id="datetime-local"
    label={texts.LABEL}
    type="datetime-local"
    className={classes.textField}
    inputProps={{
      min: fromNow(6 * HOUR),
      step: 30 * 60,
    }}
    value={currentDateTime}
    onChange={pipe(getInputValue, onDateTimeChange)}
  />
));
