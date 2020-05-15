import { OTHERS_DATA_KEY } from '@keen.io/charts';

export const createLegendLabels = (
  data: Record<string, any>[],
  colors: string[],
  labelSelector: string,
  stackElem: string[]
) => {
  const labels = data
    .filter(item => !stackElem.includes(item.name))
    .map((item, idx) => ({
      name: item[labelSelector],
      color: colors[idx],
    }));

  if (stackElem) {
    labels.push({
      name: OTHERS_DATA_KEY,
      color: colors[labels.length],
    });
  }

  return labels;
};
