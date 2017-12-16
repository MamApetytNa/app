import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import preset from 'jss-preset-default';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import App from './components/App';

class Bootstrap extends Component {
  constructor(props) {
    super(props);

    this.theme = createMuiTheme({
      palette: {
        type: 'light',
      },
    });
    this.jss = create(preset());
    this.jss.options.createGenerateClassName = createGenerateClassName;
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { store, sheetsRegistry } = this.props;
    return (
      <AppContainer>
        <Provider store={store}>
          <JssProvider registry={sheetsRegistry} jss={this.jss}>
            <MuiThemeProvider theme={this.theme} sheetsManager={new Map()}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </AppContainer>
    );
  }
}

export default function createApp(store, sheetsRegistry) {
  return (<Bootstrap
    store={store}
    sheetsRegistry={sheetsRegistry}
  />);
}
