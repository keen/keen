import { VisualizationOptions } from './types';
import { MetricChartSettings } from '@keen.io/charts';
import { INTERVAL_TO_PRECISION } from '@keen.io/charts-utils';

export const setChartSettings = ({
  query,
  componentSettings,
}: VisualizationOptions): Partial<MetricChartSettings> => {
  const {
    type,
    usePercentDifference,
  } = componentSettings as MetricChartSettings;

  const { interval } = query;

  let settings = {};

  if (!Object.keys(query).length) return settings;

  if (interval) {
    let secondaryValueDescription = null;
    if (type === 'comparison') {
      secondaryValueDescription = getSuffix(interval, 'Previous');
    }
    if (type === 'difference') {
      secondaryValueDescription = getSuffix(
        interval,
        'Change from the previous'
      );
    }
    if (usePercentDifference) {
      secondaryValueDescription = getSuffix(
        interval,
        'Percentage change from the previous'
      );
    }
    if (secondaryValueDescription) {
      settings = {
        ...settings,
        secondaryValueDescription,
      };
    }
  }

  settings = {
    ...settings,
  };
  return settings;
};

export const getSuffix = (interval: string, prefix: string) => {
  if (Object.keys(INTERVAL_TO_PRECISION).includes(interval)) {
    return `${prefix} ${INTERVAL_TO_PRECISION[interval]}`;
  }
  return interval.split('_').join(' ').replace('every', prefix);
};
