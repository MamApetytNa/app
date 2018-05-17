import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { SizesProvider } from 'react-sizes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';

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
    const {
      fallbackSize: { width: fallbackWidth, height: fallbackHeight },
      store,
      sheetsRegistry,
      appContainer: AppContainer,
    } = this.props;

    return (
      <AppContainer>
        <Provider store={store}>
          <SizesProvider config={{ fallbackHeight, fallbackWidth }}>
            <JssProvider registry={sheetsRegistry} jss={this.jss}>
              <MuiThemeProvider theme={this.theme} sheetsManager={new Map()}>
                <App pages={pages} />
              </MuiThemeProvider>
            </JssProvider>
          </SizesProvider>
        </Provider>
      </AppContainer>
    );
  }
}

export default function createApp(store, sheetsRegistry, appContainer, fallbackSize = {}) {
  return (<Bootstrap
    appContainer={appContainer}
    fallbackSize={fallbackSize}
    store={store}
    sheetsRegistry={sheetsRegistry}
  />);
}
