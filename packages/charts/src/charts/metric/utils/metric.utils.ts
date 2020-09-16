import { getFromPath } from '../../../utils/selectors.utils';

export type MetricType = 'difference' | 'comparison' | 'simple';

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
) => (currentValue / previousValue) * 100 - 100;

export const calculateDifference = (
  previousValue: number,
  currentValue: number,
  usePercentage: boolean
) => {
  switch (true) {
    case usePercentage === true:
      const value = calculatePercentDifference(previousValue, currentValue);
      return value % 1 === 0 ? value : Number(value.toFixed(2));
    case usePercentage === false:
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
  usePercentDifference,
}: Options): {
  value: number;
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
