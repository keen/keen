import { getFromPath } from '@keen.io/charts-utils';

import { MetricType } from '../types';

type Options = {
  data: Readonly<Record<string, any>[]>;
  keys: string[];
  labelSelector: string;
  type: MetricType;
  usePercentDifference?: boolean;
};

export type Difference = {
  value: number;
  status?: 'increase' | 'decrease' | 'static';
};

export const calculatePercentDifference = (
  previousValue: number,
  currentValue: number
) => (previousValue === 0 ? 0 : (currentValue / previousValue) * 100 - 100);

export const calculateDifference = (
  previousValue: number,
  currentValue: number,
  usePercentage: boolean
) => {
  if (usePercentage) {
    const value = calculatePercentDifference(previousValue, currentValue);
    return value % 1 === 0 ? value : Number(value.toFixed(2));
  }

  return currentValue - previousValue;
};

export const setStatus = (previousValue: number, currentValue: number) => {
  if (previousValue === currentValue) return 'static';
  if (currentValue > previousValue) return 'increase';
  return 'decrease';
};

export const generateMetric = ({
  type,
  keys,
  data,
  usePercentDifference,
}: Options): {
  value: number;
  previousValue?: number;
  difference?: Difference;
} => {
  const [keyName] = keys;
  const seriesLength = data.length;
  const hasMultipleResults = seriesLength > 1;

  if (hasMultipleResults && type !== 'simple') {
    const previousValue = getFromPath(data, [seriesLength - 2, keyName]);
    const currentValue = getFromPath(data, [seriesLength - 1, keyName]);
    const usePercentage = usePercentDifference && type === 'difference';

    const valueDifference = calculateDifference(
      previousValue,
      currentValue,
      usePercentage
    );

    return {
      value: currentValue,
      previousValue,
      difference: {
        value: Math.abs(valueDifference),
        status: setStatus(previousValue, currentValue),
      },
    };
  }

  const metricData = data[data.length - 1];

  return {
    value: metricData[keyName],
  };
};
