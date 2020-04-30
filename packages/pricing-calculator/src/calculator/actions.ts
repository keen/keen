import {
  UPDATE_SERVICE,
  UPDATE_EVENTS,
  UPDATE_QUERIES,
  SET_SLIDER_DIMENSION,
} from '../constants';

import { ServiceId, ActionTypes } from '../types';

export const updateService = (id: ServiceId, state: boolean): ActionTypes => ({
  type: UPDATE_SERVICE,
  payload: {
    id,
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

export const setSliderDimension = (dimension: number): ActionTypes => ({
  type: SET_SLIDER_DIMENSION,
  payload: {
    dimension,
  },
});
