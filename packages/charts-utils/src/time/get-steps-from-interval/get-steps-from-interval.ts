/**
 * Get step range based on custom interval definition.
 *
 * @param interval - time interval
 * @return step range
 *
 */
const getStepsFromInterval = (interval: string) => {
  const [, steps] = interval.split('_');
  return parseInt(steps);
};

export default getStepsFromInterval;
