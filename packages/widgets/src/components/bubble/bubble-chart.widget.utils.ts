export const createLegendLabels = (
  data: Record<string, any>[],
  labelSelector: string
) => {
  const labels = data.map((item) => item[labelSelector]);
  const uniqLabels = new Set(labels);
  return [...uniqLabels];
};
