import React from 'react';

import Link from 'redux-first-router-link';
import withStyles from 'material-ui/styles/withStyles';

import { goHome } from '../actions';

import Header from './Header';
import ScrollContext from './ScrollContext';
import PageSwitcher from './PageSwitcher';

const styles = theme => ({
  container: {
    maxWidth: theme.spacing.unit * 128,
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing.unit * 2,
  },
});

function HomeLink({ children, ...props }) {
  return (<Link to={goHome()} {...props}>{children}</Link>);
}

export default withStyles(styles)(({ classes }) => (
  <ScrollContext>
    <Header homeLink={HomeLink} />
    <div className={classes.container} >
      <PageSwitcher />
    </div>
  </ScrollContext>
));
