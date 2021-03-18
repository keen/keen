import { VisualizationOptions } from './types';
import { MetricChartSettings } from '@keen.io/charts';
import { Analysis } from '@keen.io/query';
import { INTERVAL_UNITS } from '../../../../charts-utils/src/constants';

export const setChartSettings = ({
  query,
  componentSettings,
}: VisualizationOptions): Partial<MetricChartSettings> => {
  const {
    type,
    usePercentDifference,
  } = componentSettings as MetricChartSettings;

  const {
    target_property: targetProperty,
    event_collection: eventCollection,
    analysis_type: analysisType,
    percentile,
    interval,
  } = query;

  let caption = '';
  let settings = {};

  const prefix = getPrefix(analysisType, percentile);
  if (targetProperty) {
    caption = prefix + ' ' + targetProperty;
  } else {
    caption = prefix + ' ' + eventCollection;
  }
  caption = caption.replace(/^./, (str) => str.toUpperCase());
  if (interval) {
    caption += ' ' + getSuffix(interval, '- Last');
  }
  settings = {
    ...settings,
    caption,
  };
  if (type === 'comparison') {
    settings = {
      ...settings,
      tooltip: getSuffix(interval, 'Previous'),
    };
  }
  if (type === 'difference') {
    settings = {
      ...settings,
      tooltip: getSuffix(interval, 'Change from the previous'),
    };
  }
  if (usePercentDifference) {
    settings = {
      ...settings,
      tooltip: getSuffix(interval, 'Percentage change from the previous'),
    };
  }
  return settings;
};

export const getSuffix = (interval: string, prefix: string) => {
  if (Object.keys(INTERVAL_UNITS).includes(interval)) {
    return `${prefix} ${INTERVAL_UNITS[interval]}`;
  }
  return interval.split('_').join(' ').replace('every', prefix);
};

export const getPrefix = (analysisType: Analysis, percentile = 0) => {
  if (analysisType === 'percentile') {
    return percentile + ' ' + analysisType + ' of';
  }
  if (['count_unique', 'select_unique'].includes(analysisType)) {
    return analysisType.split('_').join(' of ');
  }
  if (['average', 'maximum', 'minimum', 'median'].includes(analysisType)) {
    return analysisType;
  }
  return analysisType.split('_').join(' ') + ' of';
};
