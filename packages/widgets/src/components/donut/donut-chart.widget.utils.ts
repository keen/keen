export const createLegendLabels = (
  data: Record<string, any>[],
  colors: string[],
  labelSelector: string
) =>
  data.map((item, idx) => ({
    name: item[labelSelector],
    color: colors[idx],
  }));
