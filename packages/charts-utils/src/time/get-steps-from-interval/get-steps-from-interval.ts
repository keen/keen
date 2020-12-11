const getStepsFromInterval = (interval: string) => {
  const [, steps] = interval.split('_');
  return steps;
};

export default getStepsFromInterval;
