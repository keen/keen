import Recommendation from './recommendation.component';
import {
  recommendationReducer,
  ReducerState as RecomendationState,
} from './reducer';
import { setRecommendation } from './actions';
import { getCurrentPlan } from './selectors';

export {
  Recommendation,
  RecomendationState,
  recommendationReducer,
  setRecommendation,
  getCurrentPlan,
};
