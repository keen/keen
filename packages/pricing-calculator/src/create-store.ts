import {
  createStore as reduxStore,
  applyMiddleware,
  Reducer,
  Middleware,
} from 'redux';

export const createStore = (reducer: Reducer, middleware: Middleware[]) =>
  reduxStore(reducer, {}, applyMiddleware(...middleware));
