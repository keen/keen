import { plansConfig } from '../plans-config';

import { UPDATE_EVENTS, UPDATE_QUERIES, UPDATE_SERVICE } from '../constants';

import { Services } from './types';
import { ActionTypes } from '../types';

export type ReducerState = {
  events: number;
  queries: number;
  services: Record<Services, boolean>;
};

export const initialState: ReducerState = {
  events: plansConfig.team.events,
  queries: plansConfig.team.queries,
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
          [action.payload.name]: action.payload.state,
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
    default:
      return state;
  }
};
