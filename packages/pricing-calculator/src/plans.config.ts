import { PlanDetails, PlanId } from './types';

export const plansConfig: Record<PlanId, PlanDetails> = {
  team: {
    title: 'Team Plan',
    basePrice: 299,
    events: 250000,
    queries: 5000,
    priceTreshold: 0,
    components: ['25 Access Keys', '5 Cached Queries', '5 Cached Datasets'],
    ctaLabel: 'Start Your Free Trial',
    ctaUrl:
      'https://keen.io/users/signup?ref=eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJLZWVuVXNlck1hbmFnZW1lbnRTZXJ2aWNlLXByb2QiLCJhdWQiOiJrZWVuLmlvIiwiaWF0IjoxNTg4MDg4NDAzLCJpbnZpdGVlX25hbWUiOm51bGwsIm9mZmVyX2hhbmRsZSI6InB1YmxpYy10cmlhbC12MiJ9.39QEry1_aLV5VclTVdRPdvdbeqX9yw7Ggwcm5GuCkHFVCkYWSFIUKResFo19l20b3QERByr6tWk9r7s7Ep22kA',
    detailsUrl: 'https://keen.io/pricing/#block_5d54065d8b7e2',
  },
  business: {
    title: 'Business Plan',
    basePrice: 999,
    events: 5000000,
    queries: 25000,
    priceTreshold: 800,
    components: ['50 Access Keys', '50 Cached Queries', '50 Cached Datasets'],
    ctaLabel: 'Request a Demo',
    ctaUrl: 'https://try.keen.io/contact',
    detailsUrl: 'https://keen.io/pricing/#block_5d54065d8b7e2',
  },
  custom: {
    title: 'Custom Plan',
    basePrice: 2500,
    events: 20000000,
    queries: 100000,
    priceTreshold: 2000,
    components: ['Tell us what you need'],
    ctaLabel: 'Request a Demo',
    ctaUrl: 'https://try.keen.io/contact',
    detailsUrl: 'https://keen.io/pricing/#block_5d54065d8b7e2',
  },
};

export const PLANS_WITHOUT_S3: PlanId[] = ['team'];

export const PLANS_WITHOUT_SERVICES: PlanId[] = ['team'];

export const eventsGroup = {
  price: 1,
  amount: 5000,
};

export const queryGroup = {
  price: 5,
  amount: 100,
};

export const s3StreamingPrice = 100;
