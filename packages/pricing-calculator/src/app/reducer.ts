import { SET_DEVICE } from '../constants';

import { Device, ActionTypes } from '../types';

export type ReducerState = {
  device: Device;
};

export const initialState: ReducerState = {
  device: 'desktop',
};

export const appReducer = (
  state: ReducerState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case SET_DEVICE:
      return {
        ...state,
        device: action.payload.device,
      };
    default:
      return state;
  }
};
