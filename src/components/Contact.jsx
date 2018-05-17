import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { withProps } from 'recompose';

import { rules } from '../utils/css';

import Map from './Map';
import ContactInfo from './ContactInfo';
import CompanyInfo from './CompanyInfo';
import OpenHours from './OpenHours';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  section: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  sectionHeading: rules.sectionHeading(theme),
});

function Contact({ classes, className, contact }) {
  const Section = withProps({
    className: classes.section,
    item: true,
    xs: 12,
    sm: 12,
    md: 12,
  })(Grid);

  return (
    <Grid container spacing={16} className={classNames(className, classes.root)}>
      <Grid item xs={12} sm={5} md={4} spacing={16}>
        <Grid container spacing={16}>
          <Section>
            <CompanyInfo
              address={contact.address}
              iban={contact.iban}
              name={contact.name}
              taxId={contact.taxId}
            />
          </Section>
          <Section>
            <OpenHours hours={contact.openHours} />
          </Section>
          <Section>
            <ContactInfo
              colorfulIcons
              address={contact.address}
              email={contact.email}
              phone={contact.phone}
              social={contact.social}
            />
          </Section>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Contact);
