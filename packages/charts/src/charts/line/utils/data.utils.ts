import { stack } from 'd3-shape';

import { KeyNamesValuesType } from '../types';

export const calculateStackData = (
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): any[] => {
  const stackedData = stack().keys(keys)(data);

  const newData = stackedData.reduce((acc, value) => {
    const stackValues = value.map((el, idx) => {
      const base = {
        ...acc[idx],
        [labelSelector]: el.data[labelSelector],
      };
      const first = {
        ...base,
        [value.key]: el[1],
      };
      return first;
    });

    return [...stackValues];
  }, []);

  if (!keys.length) {
    return data.map((el) => ({ labelSelector: el[labelSelector] }));
  }

  return newData;
};

export const calculateStackAreaData = (
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): any => {
  const stackedData = stack().keys(keys)(data);

  const reduceStack = (id: number) => (
    acc: Record<string, any>[],
    value: Record<string, any>
  ) => {
    const stackValues = value.map((el: Record<string, any>, idx: number) => {
      const base = {
        ...acc[idx],
        [labelSelector]: el.data[labelSelector],
      };
      const first = {
        ...base,
        [value.key]: el[id],
      };
      return first;
    });

    return [...stackValues];
  };

  const firstDataPart = stackedData.reduce(reduceStack(0), []);
  const secondDataPart = stackedData.reduce(reduceStack(1), []);

  if (!keys.length) {
    return data.map((el) => ({ labelSelector: el[labelSelector] }));
  }

  return { firstDataPart, secondDataPart: secondDataPart.reverse() };
};

export const sortKeys = (data: Record<string, any>[], keys: string[]) => {
  const sumKeys = data.reduce((acc, item) => {
    let idx = 0;
    for (const [key, value] of Object.entries(item).filter((a) =>
      keys.includes(a[0])
    )) {
      if (acc[idx]) {
        acc[idx] = {
          ...acc[idx],
          value: acc[idx].value + value,
        };
      } else {
        acc[idx] = {
          key: key,
          value,
        };
      }
      idx++;
    }
    return acc;
  }, []);

  sumKeys.sort(
    (a: { key: string; value: number }, b: { key: string; value: number }) =>
      a.value < b.value ? 1 : -1
  );
  return sumKeys.map((item: { key: string; value: number }) => item.key);
};

export const calculateMaxMinSeriesValue = (
  data: Record<string, any>[],
  labelSelector: string
): KeyNamesValuesType => {
  let keyNamesValues: KeyNamesValuesType = {};
  return data.reduce((acc, serie) => {
    for (const [key, value] of Object.entries(serie)) {
      if (key !== labelSelector) {
        if (acc[key]) {
          keyNamesValues = {
            ...keyNamesValues,
            [key]: {
              min: value < acc[key].min ? value : acc[key].min,
              max: value > acc[key].max ? value : acc[key].max,
            },
          };
        } else {
          keyNamesValues = {
            ...keyNamesValues,
            [key]: {
              min: value,
              max: value,
            },
          };
        }
      }
    }

    return { ...acc, ...keyNamesValues };
  }, []);
};
