import { max as getMax, min as getMin } from 'd3-array';

export const useSlider = (data: any[]): { min: number; max: number } => {
  const dataArray = [] as any[];
  data.forEach(item => {
    for (const property in item) {
      typeof item[property] === 'number' && dataArray.push(item[property]);
    }
  });

  return {
    min: getMin(dataArray),
    max: getMax(dataArray),
  };
};
