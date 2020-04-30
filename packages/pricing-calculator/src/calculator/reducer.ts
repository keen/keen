import { plansConfig } from '../plans.config';

import {
  UPDATE_EVENTS,
  UPDATE_QUERIES,
  UPDATE_SERVICE,
  SET_SLIDER_DIMENSION,
} from '../constants';

import { ServiceId, ActionTypes } from '../types';

export type ReducerState = {
  events: number;
  queries: number;
  sliderDimension: number;
  services: Record<ServiceId, boolean>;
};

export const initialState: ReducerState = {
  events: plansConfig.team.events,
  queries: plansConfig.team.queries,
  sliderDimension: 0,
  services: {
    s3Streaming: false,
    rbac: false,
    customSSL: false,
  },
};

export const calculatorReducer = (
  state: ReducerState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case UPDATE_SERVICE:
      return {
        ...state,
        services: {
          ...state.services,
          [action.payload.id]: action.payload.state,
        },
      };
    case UPDATE_QUERIES:
      return {
        ...state,
        queries: action.payload.amount,
      };
    case UPDATE_EVENTS:
      return {
        ...state,
        events: action.payload.amount,
      };
    case SET_SLIDER_DIMENSION:
      return {
        ...state,
        sliderDimension: action.payload.dimension,
      };
    default:
      return state;
  }
};
