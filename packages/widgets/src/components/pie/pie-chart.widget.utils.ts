import { colors as palette } from '@keen.io/colors';

export const createLegendLabels = (
  data: Record<string, any>[],
  colors: string[],
  labelSelector: string
) =>
  data.map((item, idx) => ({
    name: item[labelSelector],
    color: Array.isArray(item[labelSelector]) ? palette.gray[500] : colors[idx],
  }));
