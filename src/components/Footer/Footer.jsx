import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { withProps } from 'recompose';

import ContactInfo from '../ContactInfo';
import CompanyInfo from '../CompanyInfo';
import OpenHours from '../OpenHours';
import Map from '../Map';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing.unit,
  },
  info: {
    color: theme.palette.primary.contrastText,
  },
  sectionContainer: {
    maxWidth: '100vw',
    overflow: 'hidden',
    margin: 0,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
      maxWidth: theme.spacing.unit * 128,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  section: {
    maxWidth: 'auto',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      maxWidth: '15em',
    },
  },
  contactIcon: {
    color: theme.palette.primary.contrastText,
  },
});

function Footer({ classes, contact }) {
  const Section = withProps({
    className: classes.section,
    item: true,
    xs: 12,
    md: 3,
  })(Grid);

  return (
    <div className={classes.root}>
      <Grid container className={classes.sectionContainer} spacing={16}>
        <Section sm={12}>
          <CompanyInfo
            address={contact.address}
            name={contact.name}
            className={classes.info}
          />
        </Section>
        <Section sm={6}>
          <OpenHours
            hours={contact.openHours}
            className={classes.info}
          />
        </Section>
        <Section sm={6}>
          <ContactInfo
            iconClassName={classes.contactIcon}
            address={contact.address}
            email={contact.email}
            phone={contact.phone}
            social={contact.social}
            className={classes.info}
          />
        </Section>
      </Grid>
      <Map />
    </div>
  );
}

export default withStyles(styles)(Footer);
