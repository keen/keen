/**
 * Extract group settings
 *
 * @param groupBy - group by settings
 * @return collection of groups
 */
const extractGroupSettings = (groupBy: string | string[]) => {
  if (typeof groupBy === 'string') return [groupBy];
  return groupBy;
};

export default extractGroupSettings;
