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

export type Charts = 'pie' | 'bar' | 'line';

export type Query = {
  interval?: string;
  group_by?: string | string[];
  analysis_type: Analysis;
};

export type AtomicResult = { [key: string]: string | number } & {
  result: number;
};

export type IntervalResult = {
  timeframe: { start: string; end: string };
  value: number | AtomicResult[];
};

export type AnalysisResult = number | IntervalResult[] | AtomicResult[];
