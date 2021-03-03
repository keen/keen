export const calculatePartialPercents = (
  total: number,
  components: Record<string, number>
) =>
  Object.keys(components).map((keyName) => ({
    label: keyName,
    value: components[keyName],
    percentValue: `${Math.round((components[keyName] / total) * 100)}%`,
  }));
