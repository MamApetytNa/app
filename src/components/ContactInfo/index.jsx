import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import SvgIcon from 'material-ui/SvgIcon';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import React from 'react';
import { withProps } from 'recompose';

import { rules } from '../../utils/css';

import FacebookIcon from './facebook.svg';
import InstagramIcon from './instagram.svg';

function wrapIcon(Icon, className) {
  return (props) => {
    const originalIcon = Icon(props);
    return (
      <SvgIcon
        {...originalIcon.props}
        className={classNames(className, originalIcon.props.className)}
      >
        {originalIcon.props.children}
      </SvgIcon>
    );
  };
}

const texts = {
  CONTACT_HEADING: 'Kontakt',
};

const styles = theme => ({
  root: {
    fontStyle: 'normal',
  },
  sectionHeading: rules.sectionHeading(theme),
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
  emailIcon: {
    color: '#ea4335',
  },
  facebookIcon: {
    color: '#3b5998',
  },
  instagramIcon: {
    color: '#e1306c',
  },
});

function ContactInfo({
  classes = {},
  className = '',
  colorfulIcons = false,
  iconClassName,
  email = '',
  phone = '',
  social = {},
}) {
  function getIconClassName(colorfulClassName) {
    return classNames(
      classes.contactIcon,
      { [colorfulClassName]: colorfulIcons },
      iconClassName,
    );
  }

  const contact = [{
    name: 'phone',
    href: `tel:${phone}`,
    icon: withProps({
      className: getIconClassName(classes.phoneIcon),
    })(PhoneIcon),
    label: phone,
  }, {
    name: 'email',
    href: `mailto:${email}`,
    icon: withProps({
      className: getIconClassName(classes.emailIcon),
    })(EmailIcon),
    label: email,
  }, social.facebook && {
    name: 'facebook',
    href: `https://facebook.com/${social.facebook}`,
    icon: wrapIcon(
      FacebookIcon,
      getIconClassName(classes.facebookIcon),
    ),
    label: 'Facebook',
  }, social.instagram && {
    name: 'instagram',
    href: `https://instagram.com/${social.instagram}`,
    icon: wrapIcon(
      InstagramIcon,
      getIconClassName(classes.instagramIcon),
    ),
    label: 'Instagram',
  }].filter(Boolean);

  return (
    <address className={classNames(classes.root, className)}>
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
          <Icon />
          <span className={classes.contactLabel}>{info.label}</span>
        </Typography>
      ))}
    </address>
  );
}

export default withStyles(styles)(ContactInfo);
