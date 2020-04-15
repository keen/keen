import { combineReducers } from 'redux';

import { calculatorReducer } from './calculator';
import { recommendationReducer } from './recommendation';
import { appReducer } from './app';

import {
  CALCULATOR_REDUCER,
  RECOMMENDATION_REDUCER,
  APP_REDUCER,
} from './constants';

export const createRootReducer = () =>
  combineReducers({
    [APP_REDUCER]: appReducer,
    [CALCULATOR_REDUCER]: calculatorReducer,
    [RECOMMENDATION_REDUCER]: recommendationReducer,
  });
