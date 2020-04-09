import {
  APP_START,
  UPDATE_SERVICE,
  UPDATE_EVENTS,
  SET_DEVICE,
  UPDATE_QUERIES,
  SET_RECOMMENDATION,
} from './constants';

import { AppReducerState } from './app';
import { RecomendationState } from './recommendation';
import { CalculatorState } from './calculator';

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

export type Service = {
  id: ServiceId;
  name: string;
  description: string;
};

export type Device = 'mobile' | 'desktop';

export type PricingPoints = 's3' | 'queries' | 'events';

export type PlanId = 'team' | 'business' | 'custom';

export type ServiceId = 's3Streaming' | 'rbac' | 'customSSL';

/* State */

export type AppState = {
  app: AppReducerState;
  calculator: CalculatorState;
  recommendation: RecomendationState;
};

/* Actions */

interface AppStartAction {
  type: typeof APP_START;
}

interface UpdateServiceAction {
  type: typeof UPDATE_SERVICE;
  payload: {
    id: ServiceId;
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
    plan: PlanId;
  };
}

interface SetDeviceAction {
  type: typeof SET_DEVICE;
  payload: {
    device: Device;
  };
}

export type ActionTypes =
  | AppStartAction
  | UpdateServiceAction
  | UpdateEventsAction
  | UpdateQueriesAction
  | SetDeviceAction
  | SetRecommendationAction;
