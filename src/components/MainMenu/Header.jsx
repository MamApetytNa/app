import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import React from 'react';

import { goToAbout, goToAddress, goToContact, goToItemList } from '../../actions';
import { noopComponent } from '../../utils/fun';

const styles = ({
  button: {
    width: 'auto',
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const texts = {
  ABOUT: 'O mnie',
  ADDRESS: 'Dojazd',
  CONTACT: 'Kontakt',
  LIST: 'Ciasta',
};

const buttons = [
  [texts.LIST, goToItemList],
  [texts.ABOUT, goToAbout],
  [texts.ADDRESS, goToAddress],
  [texts.CONTACT, goToContact],
];

function HeaderMainMenu({
  className,
  classes,
  link: Link = noopComponent,
}) {
  return (
    <List component="nav" className={classNames(className, classes.root)}>{
      buttons.map(([label, targetAction]) => (
        <ListItem
          className={classes.button}
          button
          key={label}
          component={Link}
          to={targetAction()}
        >
          {label}
        </ListItem>
      ))}
    </List>
  );
}

export default withStyles(styles)(HeaderMainMenu);