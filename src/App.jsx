import React from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

import ScrollContext from './components/ScrollContext';
import PageSwitcher from './components/PageSwitcher';

const styles = theme => ({
  container: {
    maxWidth: theme.spacing.unit * 96,
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing.unit * 2,
  },
});

const texts = {
  TITLE: 'Olga ma wypieki',
};

export default withStyles(styles)(({ classes }) => (
  <ScrollContext>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          {texts.TITLE}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.container} >
      <PageSwitcher />
    </div>
  </ScrollContext>
));
