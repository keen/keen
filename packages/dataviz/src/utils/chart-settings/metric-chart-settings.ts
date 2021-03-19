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
    caption,
  };
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
