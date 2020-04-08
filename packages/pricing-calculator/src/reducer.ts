import { combineReducers } from 'redux';

import { calculatorReducer } from './calculator';
import { recommendationReducer } from './recommendation';

import { CALCULATOR_REDUCER, RECOMMENDATION_REDUCER } from './constants';

export const createRootReducer = () =>
  combineReducers({
    [CALCULATOR_REDUCER]: calculatorReducer,
    [RECOMMENDATION_REDUCER]: recommendationReducer,
  });
