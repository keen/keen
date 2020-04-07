import { SET_RECOMMENDATION } from '../constants';

import { Plans } from './types';
import { ActionTypes } from '../types';

export const setRecommendation = (plan: Plans): ActionTypes => ({
  type: SET_RECOMMENDATION,
  payload: {
    plan,
  },
});
