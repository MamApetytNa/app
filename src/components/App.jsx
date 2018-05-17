import React from 'react';

import Link from 'redux-first-router-link';
import { withStyles } from '@material-ui/core/styles';

import { goHome } from '../actions';

import Footer from './Footer';
import Header from './Header';
import ScrollContext from './ScrollContext';
import PageSwitcher from './PageSwitcher';

const styles = (theme) => {
  const headerHeight = theme.spacing.unit * 8;
  const marginTop = theme.spacing.unit * 2;
  return {
    container: {
      minHeight: `calc(100vh - ${(headerHeight * 3) + marginTop}px)`,
      maxWidth: '100vw',
      overflow: 'hidden',
      [theme.breakpoints.up('md')]: {
        maxWidth: theme.breakpoints.values.md,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      marginTop,
    },
  };
};

function HomeLink({ children, ...props }) {
  return (<Link to={goHome()} {...props}>{children}</Link>);
}

export default withStyles(styles)(({ classes, pages }) => (
  <ScrollContext>
    <Header homeLink={HomeLink} menuLink={Link} />
    <div className={classes.container} >
      <PageSwitcher pages={pages} />
    </div>
    <Footer />
  </ScrollContext>
));
