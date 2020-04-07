import {
  plansConfig,
  eventsGroup,
  queryGroup,
  s3StreamingPrice,
} from './plans-config';

import { Plans } from './recommendation';

export const calculateQueriesOverage = (plan: Plans, amount: number) => {
  const { queries } = plansConfig[plan];
  const overage = amount > queries ? Math.abs(amount - queries) : 0;

  const cost = Math.ceil(overage / queryGroup.amount) * queryGroup.price;

  return {
    overage,
    cost,
  };
};

export const calculateEventsOverage = (plan: Plans, amount: number) => {
  const { events } = plansConfig[plan];
  const overage = amount > events ? Math.abs(amount - events) : 0;
  const cost = Math.ceil(overage / eventsGroup.amount) * eventsGroup.price;

  return {
    overage,
    cost,
  };
};

type Options = {
  planId: Plans;
  queries: number;
  events: number;
  s3Streaming: boolean;
};

export const calculateCost = ({
  planId,
  queries,
  events,
  s3Streaming,
}: Options) => {
  const { basePrice } = plansConfig[planId];
  const overageQueries = calculateQueriesOverage(planId, queries);
  const overageEvents = calculateEventsOverage(planId, events);

  const s3StreamingCost =
    s3Streaming && planId === 'team' ? s3StreamingPrice : 0;

  const total =
    basePrice + s3StreamingCost + overageQueries.cost + overageEvents.cost;

  return {
    plan: planId,
    total,
    servicesCost: {
      s3: s3StreamingCost,
    },
    overageCost: {
      queries: overageQueries.cost,
      events: overageEvents.cost,
    },
  };
};
