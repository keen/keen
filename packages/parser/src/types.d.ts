export declare type Analysis =
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
export declare type Intervals =
  | 'minutely'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly';
export declare type Charts = 'pie' | 'bar' | 'line' | 'funnel';
export declare type Query = {
  interval?: string;
  group_by?: string | string[];
  analysis_type: Analysis;
};
export declare type AtomicResult = {
  [key: string]: string | number;
} & {
  result: number;
};
export declare type Step = {
  with_actors: boolean;
  actor_property: string;
  event_collection: string;
  timeframe: {
    start: string;
    end: string;
  };
  optional: boolean;
  inverted: boolean;
};
export declare type IntervalResult = {
  timeframe: {
    start: string;
    end: string;
  };
  value: number | AtomicResult[];
};
export declare type AnalysisResult =
  | number
  | number[]
  | IntervalResult[]
  | AtomicResult[];
