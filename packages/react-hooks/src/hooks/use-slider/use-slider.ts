import { useMemo } from 'react';
import { max as getMax, min as getMin } from 'd3-array';

export const useSlider = (
  data: Record<string, any>[],
  keys: string[]
): { min: number; max: number } => {
  const { min, max } = useMemo(() => {
    const dataArray = [] as number[];
    data.forEach((item) => {
      for (const property in item) {
        if (typeof item[property] === 'number' && keys.includes(property)) {
          dataArray.push(item[property]);
        }
      }
    });

    return {
      min: getMin(dataArray),
      max: getMax(dataArray),
    };
  }, [keys, data]);

  return {
    min,
    max,
  };
};
