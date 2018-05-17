import React from 'react';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';

import MessengerIcon from './messenger.svg';

const texts = {
  SEND_MESSAGE: 'Wyślij wiadomość',
};

export default function MessengerButton({ id, ...props }) {
  return (
    <Button
      color="primary"
      component="a"
      href={`https://m.me/${id}`}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <SvgIcon>
        <MessengerIcon />
      </SvgIcon>
      &nbsp;{texts.SEND_MESSAGE}
    </Button>
  );
}
