import { AtomicResult, Step } from '../types';
export declare const transformFromNumber: (
  value: number
) => {
  results: {
    name: string;
    value: number;
  }[];
  keys: string[];
};
export declare const transformFunnel: ({
  steps,
  result,
}: {
  steps: Step[];
  result: number[];
}) => {
  results: {
    name: string;
    value: number;
  }[];
  keys: string[];
};
export declare const transformAtomicResult: ({
  result,
  ...properties
}: AtomicResult) => {
  [x: number]: any;
  result: number;
};
export declare const transformIntervalsFromArray: (
  values: AtomicResult[]
) => {
  data: Record<string, any>;
  keys: Set<string>;
};
