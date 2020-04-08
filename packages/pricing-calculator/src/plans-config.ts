import { PlanDetails, PlanId } from './types';

export const plansConfig: Record<PlanId, PlanDetails> = {
  team: {
    title: 'Team Plan',
    basePrice: 299,
    events: 250000,
    queries: 5000,
    priceTreshold: 0,
    components: ['25 Access Keys', '5 Cached Queries', '5 Cached Datasets'],
  },
  business: {
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
    components: ['Tell us what you need'],
  },
};

export const PLANS_WITHOUT_S3: PlanId[] = ['team'];

export const eventsGroup = {
  price: 1,
  amount: 5000,
};

export const queryGroup = {
  price: 5,
  amount: 100,
};

export const s3StreamingPrice = 100;
