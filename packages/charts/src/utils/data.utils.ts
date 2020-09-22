import { max } from 'd3-array';

export const getKeysDifference = (keys: string[], disabledKeys: string[]) =>
  keys.filter((keyName: string) => !disabledKeys.includes(keyName));

export const normalizeToPercent = (data: object[], keys: string[]) => {
  const maximumValues: number[] = data.map((item: Record<string, number>) =>
    keys.reduce((acc: number, keyName: string) => {
      const value = item[keyName];
      return acc + value;
    }, 0)
  );

  const normalized = data.map((item: Record<string, any>, idx: number) => ({
    ...item,
    ...keys.reduce(
      (acc: Record<string, any>, key: string) => ({
        ...acc,
        [key]: (item[key] / maximumValues[idx]) * 100,
      }),
      {}
    ),
  }));

  return normalized;
};

type StackedItemRange = {
  minimum: number;
  maximum: number;
};

export const calculateStackedRange = (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  let minimumRange = 0;
  let maximumRange = 0;

  data.forEach((item: Record<string, number>) => {
    const itemRange: StackedItemRange = keys.reduce(
      (acc: StackedItemRange, keyName: string) => {
        const value = item[keyName];
        if (value >= 0) acc.maximum += value;
        if (value < 0) acc.minimum += value;
        return acc;
      },
      { minimum: 0, maximum: 0 }
    );

    if (itemRange.minimum < minimumRange) minimumRange = itemRange.minimum;
    if (itemRange.maximum > maximumRange) maximumRange = itemRange.maximum;
  });

  const minimum = minValue === 'auto' ? minimumRange : minValue;
  const maximum = maxValue === 'auto' ? maximumRange : maxValue;

  return {
    minimum,
    maximum,
  };
};
