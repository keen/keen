import { max, min } from 'd3-array';

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

export const calculateStackedRange = (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  const values: number[] = data.map((item: Record<string, number>) =>
    keys.reduce((acc: number, keyName: string) => {
      const value = item[keyName];
      return acc + value;
    }, 0)
  );

  const minimum = minValue === 'auto' ? 0 : minValue;
  const maximum = maxValue === 'auto' ? max(values) : maxValue;

  return {
    minimum,
    maximum,
  };
};

export const getValues = (data: object[], keys: string[]) =>
  data.reduce(
    (acc: number[], item: any) => [
      ...acc,
      ...keys.map((key: string) => item[key]).filter(v => v !== undefined),
    ],
    []
  ) as number[];

export const calculateRange = (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  const values = getValues(data, keys);

  let minimum = minValue === 'auto' ? min(values) : minValue;
  if (minimum > 0) {
    minimum = 0;
  }

  const maximum = maxValue === 'auto' ? max(values) : maxValue;

  return {
    minimum,
    maximum,
  };
};
