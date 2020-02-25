import { getFromPath } from '../../../utils';

export type MetricType = 'percent' | 'difference' | 'compare';

type Options = {
  data: Readonly<Record<string, any>[]>;
  keys: string[];
  labelSelector: string;
  type: MetricType;
};

export type Difference = {
  value: number;
  status?: 'increase' | 'decrease' | 'static';
};

export const calculatePercentDifference = (
  previousValue: number,
  currentValue: number
) => (currentValue / previousValue) * 100 - 100;

export const calculateDifference = (
  previousValue: number,
  currentValue: number,
  type: MetricType
) => {
  switch (type) {
    case 'percent':
      const value = calculatePercentDifference(previousValue, currentValue);
      return value % 1 === 0 ? value : Number(value.toFixed(2));
    case 'difference':
      return previousValue - currentValue;
    default:
      return previousValue;
  }
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
}: Options): {
  value: number;
  difference?: Difference;
} => {
  const [keyName] = keys;
  const seriesLength = data.length;
  const hasMultipleResults = seriesLength > 1;

  if (hasMultipleResults) {
    const previousValue = getFromPath(data, [seriesLength - 2, keyName]);
    const currentValue = getFromPath(data, [seriesLength - 1, keyName]);

    const valueDifference = calculateDifference(
      previousValue,
      currentValue,
      type
    );

    return {
      value: currentValue,
      difference: {
        value: Math.abs(valueDifference),
        status: setStatus(previousValue, currentValue),
      },
    };
  }

  const [firstMetric] = data;

  return {
    value: firstMetric[keyName],
  };
};
