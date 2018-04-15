import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import { not, pipe } from 'ramda';
import React from 'react';
import { withProps, withState } from 'recompose';

import { rules } from '../../utils/css';
import MainMenu from '../MainMenu/Sidebar';
import { noopComponent } from '../../utils/fun';

const styles = theme => ({
  root: {
    position: 'relative',
    zIndex: 2,
  },
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
    zIndex: 1,
    top: 56,
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
  },
  menuButton: {
    marginLeft: -theme.spacing.unit,
  },
});

const texts = {
  TITLE: 'Olga ma Wypieki',
};

function Header({
  className,
  classes,
  homeLink: HomeLink = noopComponent,
  menuLink: MenuLink = noopComponent,
  isMenuOpen,
  setMenuOpen,
}) {
  const toggleMenu = () => setMenuOpen(not);
  const SidebarMenuLink = withProps({ onClick: toggleMenu })(MenuLink);

  return [
    <AppBar
      position="static"
      key="header"
      className={classNames(className, classes.root)}
    >
      <Toolbar className={classes.content}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" component="h1">
          <HomeLink className={classes.homeLink}>{texts.TITLE}</HomeLink>
        </Typography>
      </Toolbar>
    </AppBar>,
    isMenuOpen && <MainMenu
      key="menu"
      className={classes.menu}
      link={SidebarMenuLink}
    />,
  ];
}

export default pipe(
  withStyles(styles),
  withState('isMenuOpen', 'setMenuOpen', false),
)(Header);
