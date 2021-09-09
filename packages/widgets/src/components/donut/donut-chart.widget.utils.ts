import { OTHERS_DATA_KEY } from '@keen.io/charts';
import { colors as pallete } from '@keen.io/colors';
import { getOffsetRangeColor } from '@keen.io/charts-utils';

export const createLegendLabels = (
  data: string[],
  colors: string[],
  dataSeriesOffset: [number, number]
) => {
  const labels = data.map((item, idx) => ({
    name: item,
    color:
      item !== OTHERS_DATA_KEY
        ? getOffsetRangeColor(idx, colors, dataSeriesOffset)
        : pallete.gray[500],
  }));

  return labels;
};
