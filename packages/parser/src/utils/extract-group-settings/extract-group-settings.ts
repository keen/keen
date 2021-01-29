export const extractGroupSettings = (groupBy: string | string[]) => {
  if (typeof groupBy === 'string') return [groupBy];
  return groupBy;
};
