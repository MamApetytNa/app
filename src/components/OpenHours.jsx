import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import React from 'react';

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
  sectionHeading: {
    color: 'inherit',
    fontWeight: 'bold',
    marginBottom: theme.spacing.unit * 2,
  },
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
