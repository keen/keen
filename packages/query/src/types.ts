export type Analysis =
  | 'sum'
  | 'average'
  | 'count'
  | 'count_unique'
  | 'maximum'
  | 'minimum'
  | 'median'
  | 'percentile'
  | 'standard_deviation'
  | 'funnel'
  | 'extraction'
  | 'select_unique';

export type Intervals =
  | 'minutely'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly';

export type Direction = 'ASC' | 'DESC';

export type OrderByProperty = {
  propertyName: string;
  direction: Direction;
};

export type OrderBy = string | OrderByProperty | OrderByProperty[];

export type Step = {
  with_actors: boolean;
  actor_property: string;
  event_collection: string;
  timeframe: { start: string; end: string };
  optional: boolean;
  inverted: boolean;
};

export type Query = {
  analysis_type: Analysis;
  event_collection: string;
  interval?: string | Intervals;
  target_property?: string;
  group_by?: string | string[];
  limit?: number;
  order_by: OrderBy;
  property_names?: string[];
  steps?: Step[];
};
