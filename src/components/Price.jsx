import React from 'react';
import Typography from '@material-ui/core/Typography';

const currencies = {
  PLN: 'zł',
};

export default function Price({
  accent = false,
  classes = {},
  value = 0,
  currency = 'PLN',
  prefix = 'od',
  suffix = '',
  ...props
}) {
  const int = parseInt(value, 10);
  const fraction = parseFloat((value - int).toFixed(2), 10);
  return (
    <Typography
      {...props}
      {...(accent && { color: 'secondary' })}
      classes={classes}
      component="strong"
    >
      {prefix ? `${prefix} ` : ''}
      {int}
      {fraction ? fraction.toFixed(2).slice(1) : ''}
      &nbsp;
      {currencies[currency]}
      {suffix ? ` ${suffix}` : ''}
    </Typography>
  );
}
