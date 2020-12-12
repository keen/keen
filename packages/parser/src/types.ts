import { Query } from '@keen.io/query';

export type Charts = 'pie' | 'bar' | 'line' | 'funnel';

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

export type ParserOutput = {
  keys: string[];
  results: Record<string, any>[];
};

export type ParserSettings = {
  fillEmptyIntervalsKeys: boolean;
  mergePropertiesOrder: null | string[];
};
