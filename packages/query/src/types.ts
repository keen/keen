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

export type Timeframe = { start: string; end: string } | string;

export type OrderByProperty = {
  property_name: string;
  direction: Direction;
};

export type OrderBy = string | OrderByProperty | OrderByProperty[];

export type Step = {
  actor_property: string;
  event_collection: string;
  timeframe: Timeframe;
  with_actors?: boolean;
  optional?: boolean;
  inverted?: boolean;
};

export type Query = {
  analysis_type: Analysis;
  timeframe: Timeframe;
  event_collection: string;
  interval?: string | Intervals;
  target_property?: string;
  group_by?: string | string[];
  limit?: number;
  order_by?: OrderBy;
  property_names?: string[];
  steps?: Step[];
};
