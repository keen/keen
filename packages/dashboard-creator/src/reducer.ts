import { combineReducers } from 'redux';

export const createRootReducer = () =>
  combineReducers({
    app: (s = {}) => s,
  });
