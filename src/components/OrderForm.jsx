import React from 'react';

import TextField from 'material-ui/TextField';

import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { path, pipe } from 'ramda';

import withState from '../utils/with-state';
import { preventDefault } from '../utils/dom';

const TEL = '600475167';

const styles = {
  field: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
};

const texts = {
  HEADER: 'Dane do zamówienia',
  NAME_LABEL: 'Imię i nazwisko',
  PHONE_LABEL: 'Numer telefonu',
  CALL: 'Zadzwoń',
  CONFIRM: 'Potwierdź',
};

const getInputValue = path(['target', 'value']);

export default pipe(
  withState({
    state: {
      currentName: '',
      currentPhone: '',
    },
    actions: {
      onNameChange: currentName => ({ currentName }),
      onPhoneChange: currentPhone => ({ currentPhone }),
    },
  }),
  withStyles(styles),
)(({
  classes,
  currentName,
  currentPhone,
  onNameChange,
  onPhoneChange,
  onSubmit,
}) => (
  <Card>
    <CardHeader title={texts.HEADER} />
    <form onSubmit={
        pipe(
            preventDefault,
            () => onSubmit({
                name: currentName,
                phone: currentPhone,
            }),
        )
    }
    >
      <CardContent>
        <List>
          <ListItem>
            <TextField
              id="name"
              label={texts.NAME_LABEL}
              type="text"
              classes={{ root: classes.field }}
              value={currentName}
              placeholder="Jan Kowalski"
              onChange={pipe(getInputValue, onNameChange)}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="phone"
              label={texts.PHONE_LABEL}
              type="tel"
              classes={{ root: classes.field }}
              value={currentPhone}
              placeholder="987-654-321"
              onChange={pipe(getInputValue, onPhoneChange)}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          classes={{ root: classes.button }}
          raised
          color="primary"
          type="submit"
        >
          {texts.CONFIRM}
        </Button>
        <Button
          classes={{ root: classes.button }}
          component="a"
          href={`tel:${TEL}`}
        >
          {texts.CALL}
        </Button>
      </CardActions>
    </form>
  </Card>
));
