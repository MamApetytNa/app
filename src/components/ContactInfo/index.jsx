import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SvgIcon from 'material-ui/SvgIcon';
import PhoneIcon from 'material-ui-icons/Phone';
import EmailIcon from 'material-ui-icons/Email';
import React from 'react';
import { withProps } from 'recompose';

import FacebookIcon from './facebook.svg';
import InstagramIcon from './instagram.svg';

function wrapIcon(Icon) {
  return props => (
    <SvgIcon {...props}>
      <Icon />
    </SvgIcon>
  );
}

const texts = {
  CONTACT_HEADING: 'Kontakt',
  OPEN_HOURS_HEADING: 'Godziny otwarcia',
  TAX_ID: 'NIP',
};

const styles = theme => ({
  root: {
    maxWidth: '100vw',
    overflow: 'hidden',
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing.unit * 128,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  sectionContainer: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },
  },
  section: {
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
  contact: {
    color: 'inherit',
    textDecoration: 'none',
    marginBottom: theme.spacing.unit,
  },
  contactIcon: {
    marginRight: theme.spacing.unit,
    verticalAlign: 'middle',
  },
  contactLabel: {
    display: 'inline-block',
    verticalAlign: 'middle',
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
  email = '',
  name = '',
  openHours = [],
  phone = '',
  social = {},
  taxId = '',
}) {
  const contact = [{
    name: 'phone',
    href: `tel:${phone}`,
    icon: PhoneIcon,
    label: phone,
  }, {
    name: 'email',
    href: `mailto:${email}`,
    icon: EmailIcon,
    label: email,
  }, social.facebook && {
    name: 'facebook',
    href: `https://facebook.com/${social.facebook}`,
    icon: wrapIcon(FacebookIcon),
    label: 'Facebook',
  }, social.instagram && {
    name: 'instagram',
    href: `https://instagram.com/${social.instagram}`,
    icon: wrapIcon(InstagramIcon),
    label: 'Instagram',
  }].filter(Boolean);

  const Section = withProps({
    className: classes.section,
    item: true,
    xs: 12,
    md: 3,
  })(Grid);

  return (
    <div className={classNames(classes.root, className)}>
      <Grid container className={classes.sectionContainer}>
        <Section component="address" sm={12}>
          <Typography className={classes.paragraph}>
            <strong>{name}</strong><br />
            {address.street}<br />
            {address.zip}&nbsp;{address.city}
          </Typography>
          <Typography className={classes.taxId}>
            {texts.TAX_ID}: {taxId}
          </Typography>
        </Section>
        <Section sm={6}>
          <Typography
            variant="subheading"
            className={classes.sectionHeading}
          >
            {texts.OPEN_HOURS_HEADING}
          </Typography>
          {openHours.map(({ label, value }) => (
            <Typography className={classes.paragraph} key={label}>
              {label}:&nbsp;{value}
            </Typography>
          ))}
        </Section>
        <Section component="address" sm={6}>
          <Typography
            variant="subheading"
            className={classes.sectionHeading}
          >
            {texts.CONTACT_HEADING}
          </Typography>
          {contact.map(({ icon: Icon, ...info }) => (
            <Typography
              className={classes.contact}
              key={info.name}
              component="a"
              href={info.href}
              target="_blank"
            >
              <Icon className={classes.contactIcon} />
              <span className={classes.contactLabel}>{info.label}</span>
            </Typography>
          ))}
        </Section>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ContactInfo);
