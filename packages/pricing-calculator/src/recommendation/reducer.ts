import { plansConfig } from '../plans-config';

import { SET_RECOMMENDATION } from '../constants';

import { Plans } from './types';
import { ActionTypes } from '../types';

type ReducerState = {
  recommendedPlan: Plans;
  totalCost: number;
};

export const initialState: ReducerState = {
  recommendedPlan: 'team',
  totalCost: plansConfig.team.basePrice,
};

export const recommendationReducer = (
  state: ReducerState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_RECOMMENDATION:
      return {
        ...state,
        recommendedPlan: action.payload.plan,
      };
    default:
      return state;
  }
};
