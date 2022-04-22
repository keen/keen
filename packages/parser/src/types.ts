import { Query, Step } from '@keen.io/query';

export interface IDataParser {
  parseQueryResults: (input: ParserInput) => ParserOutput;
}

export type Transformation =
  | 'singular'
  | 'categorical'
  | 'nominal'
  | 'categorical-nominal'
  | 'chronological-nominal'
  | 'chronological-categorical-nominal'
  | 'chronological'
  | 'categorical-chronological'
  | 'extraction'
  | 'funnel';

export type ParserOutput = {
  data: Record<string, any>[];
  keys: string[];
};

export type TransformationFunction = (
  input: ParserInput,
  settings: ParserSettings,
  visualization?: string
) => ParserOutput;

export type GroupByResult = { [key: string]: string | number } & {
  result: number;
};

export type NominalGroupByResult = { [key: string]: string | number } & {
  result: string[] | number[];
};

export type IntervalResult = {
  timeframe: { start: string; end: string };
  value:
    | number
    | null
    | string
    | string[]
    | number[]
    | GroupByResult[]
    | NominalGroupByResult[];
};

export type ExtractionResult = Record<string, any>;

export type AnalysisResult =
  | number
  | (string | number)[]
  | ExtractionResult[]
  | IntervalResult[]
  | GroupByResult[];

export type DateModifier = string | number | null;

export type ParserInput = {
  query?: Query;
  steps?: Step[];
  result: AnalysisResult;
};

export type ParserSettings = {
  fillEmptyIntervalsKeys: boolean;
  mergePropertiesOrder: null | string[];
  dateModifier?: DateModifier;
};
