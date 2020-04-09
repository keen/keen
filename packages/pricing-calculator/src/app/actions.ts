import { ActionTypes, Device } from '../types';

import { APP_START, SET_DEVICE } from '../constants';

export const appStart = (): ActionTypes => ({
  type: APP_START,
});

export const setDevice = (device: Device): ActionTypes => ({
  type: SET_DEVICE,
  payload: {
    device,
  },
});
