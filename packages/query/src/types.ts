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

export type Timezones =
  | 'US/Eastern'
  | 'US/Central'
  | 'US/Mountain'
  | 'US/Pacific'
  | 'US/Alaska'
  | 'US/Hawaii'
  | 'Europe/Amsterdam'
  | 'Europe/London'
  | 'Europe/Paris'
  | 'Europe/Prague'
  | 'Europe/Stockholm'
  | 'Europe/Copenhagen'
  | 'Africa/Casablanca'
  | 'Africa/Nairobi'
  | 'Asia/Singapore'
  | 'Australia/Sydney'
  | 'Asia/Dubai'
  | 'Asia/Istanbul'
  | 'Asia/Jakarta'
  | 'Asia/Tokyo'
  | 'America/Sao_Paulo'
  | 'Australia/Perth'
  | 'Europe/Istanbul'
  | 'Pacific/Auckland'
  | 'UTC';
