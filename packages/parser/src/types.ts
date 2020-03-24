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

export type Charts = 'pie' | 'bar' | 'line' | 'funnel';

export type Query = {
  interval?: string;
  group_by?: string | string[];
  target_property: string;
  event_collection: string;
  analysis_type: Analysis;
};

export type AtomicResult = { [key: string]: string | number } & {
  result: number;
};

export type Step = {
  with_actors: boolean;
  actor_property: string;
  event_collection: string;
  timeframe: { start: string; end: string };
  optional: boolean;
  inverted: boolean;
};

export type IntervalResult = {
  timeframe: { start: string; end: string };
  value: number | AtomicResult[];
};

export type AnalysisResult =
  | number
  | number[]
  | IntervalResult[]
  | AtomicResult[];

export type ParserInput = {
  query?: Query;
  steps?: Step[];
  result: AnalysisResult;
};
