import { AppState } from '../types';

export const getCurrentPlan = (state: AppState) =>
  state.recommendation.recommendedPlan;
