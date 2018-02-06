import React from 'react';

import Link from 'redux-first-router-link';
import withStyles from 'material-ui/styles/withStyles';

import { goHome } from '../actions';

import Footer from './Footer';
import Header from './Header';
import ScrollContext from './ScrollContext';
import PageSwitcher from './PageSwitcher';

const styles = theme => ({
  container: {
    minHeight: `calc(100vh - ${theme.spacing.unit * 2})`,
    maxWidth: '100vw',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing.unit * 128,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing.unit * 2,
  },
});

function HomeLink({ children, ...props }) {
  return (<Link to={goHome()} {...props}>{children}</Link>);
}

export default withStyles(styles)(({ classes, pages }) => (
  <ScrollContext>
    <Header homeLink={HomeLink} />
    <div className={classes.container} >
      <PageSwitcher pages={pages} />
    </div>
    <Footer />
  </ScrollContext>
));
