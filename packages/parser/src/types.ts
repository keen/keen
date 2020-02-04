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

export type Value = { [key: string]: string } & { result: number };

export type SingleResult = {
  value: number | Value[];
  timeframe?: { start: string; end: string };
};

export type AnalysisResult = number | SingleResult[];
