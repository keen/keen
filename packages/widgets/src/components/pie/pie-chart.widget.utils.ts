import { OTHERS_DATA_KEY } from '@keen.io/charts';
import { colors as pallete } from '@keen.io/colors';
import { getOffsetRangeColor } from '@keen.io/charts-utils';

export const createLegendLabels = (
  data: Record<string, any>[],
  colors: string[],
  labelSelector: string,
  stackElem: string[],
  dataSeriesOffset: [number, number]
) => {
  const labels = data
    .filter((item) => !stackElem.includes(item[labelSelector]))
    .map((item, idx) => ({
      name: item[labelSelector],
      color: getOffsetRangeColor(idx, colors, dataSeriesOffset),
    }));

  if (stackElem.length) {
    labels.push({
      name: OTHERS_DATA_KEY,
      color: pallete.gray[500],
    });
  }

  return labels;
};
