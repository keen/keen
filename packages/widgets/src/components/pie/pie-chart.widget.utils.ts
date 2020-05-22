import { OTHERS_DATA_KEY } from '@keen.io/charts';
import { colors as pallete } from '@keen.io/colors';

export const createLegendLabels = (
  data: Record<string, any>[],
  colors: string[],
  labelSelector: string,
  stackElem: string[]
) => {
  const labels = data
    .map((item, idx) => ({
      name: item[labelSelector],
      color: colors[idx],
    }))
    .filter(item => !stackElem.includes(item.name));

  if (stackElem.length) {
    labels.push({
      name: OTHERS_DATA_KEY,
      color: pallete.gray[500],
    });
  }

  return labels;
};
