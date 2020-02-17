import { combineReducers } from 'redux';

import { dashboardReducer, widgetReducer } from './reducers';

import { DASHBOARD_REDUCER, WIDGET_REDUCER } from './constants';

export const createRootReducer = () =>
  combineReducers({
    app: (s = {}) => s,
    [WIDGET_REDUCER]: widgetReducer,
    [DASHBOARD_REDUCER]: dashboardReducer,
  });
