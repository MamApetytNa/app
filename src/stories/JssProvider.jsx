import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import { jss, JssProvider, SheetsRegistry } from '../utils/jss';

jss.options.createGenerateClassName = createGenerateClassName;

export default function jssProvider(component) {
  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });
  return (
    <JssProvider
      registry={new SheetsRegistry()}
      jss={jss}
    >
      <MuiThemeProvider
        theme={theme}
        sheetsManager={new Map()}
      >
        {component}
      </MuiThemeProvider>
    </JssProvider>
  );
}
