import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import {
  combineReducers,
  createStore as createReduxStore,
  applyMiddleware,
  compose,
} from 'redux';

import * as reducers from './reducers';
import { routesMap } from './routes';
import * as actionCreators from './actions';

export default function createStore(initialState, history) {
  const {
    reducer: locationReducer,
    middleware: routerMiddleware,
    enhancer,
    thunk,
  } = connectRoutes(history, routesMap, {
    restoreScroll: restoreScroll(),
  });

  function createRootReducer(childReducers) {
    return combineReducers({
      ...childReducers,
      location: locationReducer,
    });
  }

  const rootReducer = createRootReducer(reducers);
  const middlewares = applyMiddleware(routerMiddleware);

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? composeWithDevTools({ actionCreators })
    : compose;
  /* eslint-enable no-underscore-dangle */

  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(enhancer, middlewares),
  );

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(createRootReducer(require('./reducers')));
    });
  }

  return { store, thunk };
}
