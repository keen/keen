import { PlanDetails, PlanId } from './types';

export const plansConfig: Record<PlanId, PlanDetails> = {
  team: {
    title: 'Team Plan',
    basePrice: 149,
    events: 250000,
    queries: 5000,
    priceTreshold: 0,
    components: ['25 Access Keys', '5 Cached Queries', '5 Cached Datasets'],
    ctaLabel: 'Start Your Free Trial',
    ctaUrl:
      'https://keen.io/users/signup?ref=eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJLZWVuVXNlck1hbmFnZW1lbnRTZXJ2aWNlLXByb2QiLCJhdWQiOiJrZWVuLmlvIiwiaWF0IjoxNTkyMjA5OTU1LCJpbnZpdGVlX25hbWUiOm51bGwsIm9mZmVyX2hhbmRsZSI6InB1YmxpYy1mcmVlLXYyIn0.JPMnmLuExwl7oPll-0y1fLKjDi233B7dsJ-ukrS8NMKgof4c3PxEWrEkSsyN--7FZ6wb1H_UH5yO-9piF84wMQ',
    detailsUrl: 'https://keen.io/pricing/#keenBlockPlansCompare',
  },
  business: {
    title: 'Business Plan',
    basePrice: 699,
    events: 3500000,
    queries: 20000,
    priceTreshold: 550,
    components: ['50 Access Keys', '50 Cached Queries', '50 Cached Datasets'],
    ctaLabel: 'Request a Demo',
    ctaUrl: 'https://try.keen.io/contact',
    detailsUrl: 'https://keen.io/pricing/#keenBlockPlansCompare',
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
    detailsUrl: 'https://keen.io/pricing/#keenBlockPlansCompare',
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
