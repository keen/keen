import {
  plansConfig,
  PLANS_WITHOUT_S3,
  eventsGroup,
  queryGroup,
  s3StreamingPrice,
} from '../plans-config';

import { PlanId } from '../types';

export const calculateQueriesOverage = (id: PlanId, amount: number) => {
  const { queries } = plansConfig[id];
  const overage = amount > queries ? Math.abs(amount - queries) : 0;

  const cost = Math.ceil(overage / queryGroup.amount) * queryGroup.price;

  return {
    overage,
    cost,
  };
};

export const calculateEventsOverage = (id: PlanId, amount: number) => {
  const { events } = plansConfig[id];
  const overage = amount > events ? Math.abs(amount - events) : 0;
  const cost = Math.ceil(overage / eventsGroup.amount) * eventsGroup.price;

  return {
    overage,
    cost,
  };
};

type Options = {
  planId: PlanId;
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
    s3Streaming && PLANS_WITHOUT_S3.includes(planId) ? s3StreamingPrice : 0;

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
