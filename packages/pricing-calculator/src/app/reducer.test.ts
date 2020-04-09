import { Action } from 'redux';
import { appReducer, initialState } from './reducer';

import { setDevice } from './actions';

describe('@keen.io/pricing-calculator - appReducer()', () => {
  it('should return initial state', () => {
    const state = appReducer(initialState, {} as Action);

    expect(state).toEqual(initialState);
  });

  it('should set device', () => {
    const device = 'mobile';
    const action = setDevice(device);
    const state = appReducer(initialState, action);

    expect(state.device).toEqual(device);
  });
});
