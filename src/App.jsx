import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import App from './components/App';

export default store => (
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>
);
