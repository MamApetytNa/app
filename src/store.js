
import createHistory from 'history/createBrowserHistory';
import { connectRoutes } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import * as reducers from './reducers';
import { routesMap } from './routes';
import * as actionCreators from './actions';

const history = createHistory();

const {
  reducer: locationReducer,
  middleware: routerMiddleware,
  enhancer,
} = connectRoutes(history, routesMap, {
  restoreScroll: restoreScroll(),
});

const rootReducer = combineReducers({
  ...reducers,
  location: locationReducer,
});
const middlewares = applyMiddleware(routerMiddleware);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionCreators })
  : compose;
/* eslint-enable no-underscore-dangle */

export default createStore(
  rootReducer,
  global.REDUX_INITIAL_STATE,
  composeEnhancers(enhancer, middlewares),
);
