import {
  APP_START,
  UPDATE_SERVICE,
  UPDATE_EVENTS,
  UPDATE_QUERIES,
  SET_RECOMMENDATION,
} from './constants';

import { CalculatorState, Services } from './calculator';
import { Plans } from './recommendation';

export type Options = {
  container: HTMLElement | string;
};

export type PlanDetails = {
  title: string;
  basePrice: number;
  priceTreshold?: number;
  events: number;
  queries: number;
  components: string[];
};

export type PricingPoints = 's3' | 'queries' | 'events';

/* State */

export type AppState = {
  calculator: CalculatorState;
  recommendation: {
    recommendedPlan: Plans;
  };
};

/* Actions */

interface AppStartAction {
  type: typeof APP_START;
}

interface UpdateServiceAction {
  type: typeof UPDATE_SERVICE;
  payload: {
    name: Services;
    state: boolean;
  };
}

interface UpdateEventsAction {
  type: typeof UPDATE_EVENTS;
  payload: {
    amount: number;
  };
}

interface UpdateQueriesAction {
  type: typeof UPDATE_QUERIES;
  payload: {
    amount: number;
  };
}

interface SetRecommendationAction {
  type: typeof SET_RECOMMENDATION;
  payload: {
    plan: Plans;
  };
}

export type ActionTypes =
  | AppStartAction
  | UpdateServiceAction
  | UpdateEventsAction
  | UpdateQueriesAction
  | SetRecommendationAction;
