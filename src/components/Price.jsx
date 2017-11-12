import React from 'react';
import Typography from 'material-ui/Typography';

const currencies = {
  PLN: 'zł',
};

export default function Price({
  accent = false,
  classes = {},
  value = 0,
  currency = 'PLN',
  ...props
}) {
  return (
    <Typography
      {...props}
      {...(accent && { color: 'accent' })}
      classes={classes}
      component="strong"
    >
      {`od ${parseInt(value, 10)} ${currencies[currency]}`}
    </Typography>
  );
}
