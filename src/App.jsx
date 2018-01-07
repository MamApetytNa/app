import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import App from './components/App';
import { jss, JssProvider } from './utils/jss';
import { pages } from './routes';

class Bootstrap extends Component {
  constructor(props) {
    super(props);

    this.theme = createMuiTheme({
      palette: {
        type: 'light',
      },
    });
    this.jss = jss;
    this.jss.options.createGenerateClassName = createGenerateClassName;
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { store, sheetsRegistry, appContainer: AppContainer } = this.props;
    return (
      <AppContainer>
        <Provider store={store}>
          <JssProvider registry={sheetsRegistry} jss={this.jss}>
            <MuiThemeProvider theme={this.theme} sheetsManager={new Map()}>
              <App pages={pages} />
            </MuiThemeProvider>
          </JssProvider>
        </Provider>
      </AppContainer>
    );
  }
}

export default function createApp(store, sheetsRegistry, appContainer) {
  return (<Bootstrap
    appContainer={appContainer}
    store={store}
    sheetsRegistry={sheetsRegistry}
  />);
}
