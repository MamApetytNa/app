
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import React from 'react';

import Logo from '../../images/logo.svg';
import { rules } from '../../utils/css';
import { noopComponent } from '../../utils/fun';
import MainMenu from '../MainMenu/Header';

const styles = theme => ({
  content: {
    boxSizing: 'border-box',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.md,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  homeLink: rules.unstyledLink,
  logo: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    height: 48,
    marginLeft: -2 * theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    flexGrow: 1,
  },
});

const texts = {
  TITLE: 'Olga ma Wypieki',
};

function Header({
  classes,
  homeLink: HomeLink = noopComponent,
  menuLink: MenuLink = noopComponent,
}) {
  return (
    <AppBar position="static" key="header">
      <Toolbar className={classes.content}>
        <Logo className={classes.logo} />
        <Typography variant="title" color="inherit" component="h1">
          <HomeLink className={classes.homeLink}>{texts.TITLE}</HomeLink>
        </Typography>
        <MainMenu
          className={classes.menu}
          link={MenuLink}
        />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
