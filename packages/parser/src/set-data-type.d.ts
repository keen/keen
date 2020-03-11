import { Query } from './types';
export declare type DataType =
  | 'categorical-ordinal'
  | 'categorical-chronological'
  | 'categorical-interval'
  | 'extraction'
  | 'nominal'
  | 'singular'
  | 'chronological'
  | 'categorical';
export declare const setDataType: ({
  interval,
  group_by,
  analysis_type,
}: Query) => DataType;
