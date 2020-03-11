export declare type MetricType = 'percent' | 'difference' | 'compare';
declare type Options = {
  data: Readonly<Record<string, any>[]>;
  keys: string[];
  labelSelector: string;
  type: MetricType;
};
export declare type Difference = {
  value: number;
  status?: 'increase' | 'decrease' | 'static';
};
export declare const calculatePercentDifference: (
  previousValue: number,
  currentValue: number
) => number;
export declare const calculateDifference: (
  previousValue: number,
  currentValue: number,
  type: 'percent' | 'difference' | 'compare'
) => number;
export declare const setStatus: (
  previousValue: number,
  currentValue: number
) => 'static' | 'increase' | 'decrease';
export declare const generateMetric: ({
  type,
  keys,
  data,
}: Options) => {
  value: number;
  difference?: Difference;
};
export {};
