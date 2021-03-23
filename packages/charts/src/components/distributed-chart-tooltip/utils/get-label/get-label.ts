import {
  formatValue as valueFormatter,
  getFromPath,
  Formatter,
} from '@keen.io/charts-utils';

import { DataSelector } from '../../../../types';

/**
 * Prepare label for item in tooltip
 *
 * @param isPercentage - is stackMode 'percent' on
 * @param selector - selector of active bar
 * @param data - data series
 * @param percentageData - calculated percentage data
 * @param formatValue - function for tooltip value format
 * @return label that will be displayed for tooltip item
 *
 */
const getLabel = ({
  isPercentage = false,
  selector,
  data,
  percentageData,
  formatValue,
}: {
  selector: DataSelector;
  data: Record<string, any>[];
  percentageData: Record<string, any>[];
  isPercentage?: boolean;
  formatValue?: Formatter;
}) => {
  const value = valueFormatter(getFromPath(data, selector), formatValue);
  if (isPercentage) {
    return {
      value: `${getFromPath(percentageData, selector).toFixed(1)}%`,
      change: `(${value})`,
    };
  }

  return { value };
};

export default getLabel;
