import React from 'react';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';

const texts = {
  CALL: 'Zadzwoń',
};

export default function PhoneButton({ number, ...props }) {
  return (
    <Button
      color="primary"
      component="a"
      href={`tel:${number}`}
      {...props}
    >
      <PhoneIcon />&nbsp;{texts.CALL}
    </Button>
  );
}
