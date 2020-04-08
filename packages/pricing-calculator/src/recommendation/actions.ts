import { SET_RECOMMENDATION } from '../constants';

import { ActionTypes, PlanId } from '../types';

export const setRecommendation = (plan: PlanId): ActionTypes => ({
  type: SET_RECOMMENDATION,
  payload: {
    plan,
  },
});
