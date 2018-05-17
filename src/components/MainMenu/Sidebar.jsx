import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import PhoneIcon from '@material-ui/icons/Phone';
import ViewListIcon from '@material-ui/icons/ViewList';
import React from 'react';

import Logo from '../../images/logo.svg';
import { goToAbout, goToContact, goToItemList } from '../../actions';
import { noopComponent } from '../../utils/fun';

const styles = theme => ({
  root: {
    maxWidth: theme.spacing.unit * 48,
    width: '80vw',
  },
  logo: {
    margin: theme.spacing.unit * 2,
  },
});

const texts = {
  ABOUT: 'O mnie',
  ADDRESS: 'Dojazd',
  CONTACT: 'Kontakt',
  LIST: 'Ciasta',
};

const buttons = [
  [ViewListIcon, texts.LIST, goToItemList],
  [InfoIcon, texts.ABOUT, goToAbout],
  [PhoneIcon, texts.CONTACT, goToContact],
];

function SidebarMainMenu({
  className,
  classes,
  link: Link = noopComponent,
}) {
  return (
    <Drawer
      classes={{ paper: classNames(className, classes.root) }}
      open
      variant="persistent"
    >
      <Logo className={classes.logo} />
      <Divider />
      <List component="nav" >{
        buttons.map(([Icon, label, targetAction]) => (
          <ListItem
            button
            key={label}
            component={Link}
            to={targetAction()}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(SidebarMainMenu);
