import { UPDATE_SERVICE, UPDATE_EVENTS, UPDATE_QUERIES } from '../constants';

import { Services } from './types';
import { ActionTypes } from '../types';

export const updateService = (name: Services, state: boolean): ActionTypes => ({
  type: UPDATE_SERVICE,
  payload: {
    name,
    state,
  },
});

export const updateQueries = (amount: number): ActionTypes => ({
  type: UPDATE_QUERIES,
  payload: {
    amount,
  },
});

export const updateEvents = (amount: number): ActionTypes => ({
  type: UPDATE_EVENTS,
  payload: {
    amount,
  },
});
