import { stack } from 'd3-shape';

import { KeyNamesValuesType } from '../types';

/**
 * Calculate stack data for normal stacked lines.
 *
 * @param data - data series
 * @param labelSelector - selected label from data
 * @param keys - keys used for calculation
 * @return data with values recalculated
 *
 */

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
    return data.map((el) => ({ [labelSelector]: el[labelSelector] }));
  }

  return newData;
};

/**
 * Calculate stack data for normal stacked areas.
 *
 * @param data - data series
 * @param labelSelector - selected label from data
 * @param keys - keys used for calculation
 * @return data with values recalculated, as two parts to connect them
 * later(solving problems with curve line type)
 *
 */

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
    return { firstDataPart: [], secondDataPart: [] };
  }

  return { firstDataPart, secondDataPart: secondDataPart.reverse() };
};

/**
 * Calculate min and max values for each series.
 *
 * @param data - data series
 * @param labelSelector - selected label from data
 * @return min and max values for all series
 *
 */

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
