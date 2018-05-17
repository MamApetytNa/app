import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { rules } from '../utils/css';

const texts = {
  OPEN_HOURS_HEADING: 'Godziny otwarcia',
};

const styles = theme => ({
  root: {
    fontStyle: 'normal',
    maxWidth: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '15em',
    },
  },
  sectionHeading: rules.sectionHeading(theme),
  paragraph: {
    color: 'inherit',
  },
});

function ContactInfo({
  classes = {},
  className = '',
  hours = [],
}) {
  return (
    <div className={classNames(classes.root, className)}>
      <Typography
        variant="subheading"
        className={classes.sectionHeading}
      >
        {texts.OPEN_HOURS_HEADING}
      </Typography>
      {hours.map(({ label, value }) => (
        <Typography className={classes.paragraph} key={label}>
          {label}:&nbsp;{value}
        </Typography>
      ))}
    </div>
  );
}

export default withStyles(styles)(ContactInfo);
