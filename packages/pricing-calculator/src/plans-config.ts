import { Plans } from './recommendation';
import { PlanDetails } from './types';

export const plansConfig: Record<Plans, PlanDetails> = {
  team: {
    title: 'Team Plan',
    basePrice: 299,
    events: 250000,
    queries: 5000,
    priceTreshold: 0,
    components: ['25 Access Keys', '5 Cached Queries', '5 Cached Datasets'],
  },
  bussiness: {
    title: 'Business Plan',
    basePrice: 999,
    events: 5000000,
    queries: 25000,
    priceTreshold: 800,
    components: ['50 Access Keys', '50 Cached Queries', '50 Cached Datasets'],
  },
  custom: {
    title: 'Custom Plan',
    basePrice: 2000,
    events: 5000000,
    queries: 5000000,
    priceTreshold: 2000,
    components: [
      'Unlimited Access Keys',
      'Custom number of Cached Queries',
      'Custom number of Cached Datasets',
    ],
  },
};

export const eventsGroup = {
  price: 1,
  amount: 5000,
};

export const queryGroup = {
  price: 5,
  amount: 100,
};

export const s3StreamingPrice = 100;
