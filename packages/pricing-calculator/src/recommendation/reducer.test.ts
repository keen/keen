import { Action } from 'redux';
import { recommendationReducer, initialState } from './reducer';

import { setRecommendation } from './actions';

describe('@keen.io/pricing-calculator - recommendationReducer()', () => {
  it('should return initial state', () => {
    const state = recommendationReducer(initialState, {} as Action);

    expect(state).toEqual(initialState);
  });

  it('should set reccomended plan', () => {
    const plan = 'custom';
    const action = setRecommendation(plan);
    const { recommendedPlan } = recommendationReducer(initialState, action);

    expect(recommendedPlan).toEqual(plan);
  });
});
