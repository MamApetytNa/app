import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

import { rules } from '../utils/css';

const styles = {
  homeLink: rules.unstyledLink,
};

const texts = {
  TITLE: 'Olga ma Wypieki',
};

function Header({
  classes,
  homeLink: HomeLink = () => {},
}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          <HomeLink className={classes.homeLink}>{texts.TITLE}</HomeLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
