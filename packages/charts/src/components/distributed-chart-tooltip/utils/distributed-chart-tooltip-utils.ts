import { DataSelector, GroupMode } from '../../../types';
import {
  formatValue as valueFormatter,
  getFromPath,
  TooltipFormatter,
} from '@keen.io/charts-utils';

/**
 * Prepare selectors for bar while mouse hover
 *
 * @param isPercentage - is stackMode 'percent' on
 * @param selector - selector of active bar
 * @param data - data series
 * @param percentageData - calculated percentage data
 * @param formatValue - function for tooltip value format
 * @return a value that will be displayed in tooltip
 *
 */
export const getLabel = ({
  isPercentage,
  selector,
  data,
  percentageData,
  formatValue,
}: {
  selector: DataSelector;
  isPercentage: boolean;
  data: Record<string, any>[];
  percentageData: Record<string, any>[];
  formatValue?: TooltipFormatter;
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

/**
 * Prepare selectors for bar while mouse hover
 *
 * @param groupMode - groupMode option
 * @param keys - keys for the calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param colors - colors array
 * @param selector - color of the bar
 * @return return an array of DataSelector objects with a color
 *
 */

export const getSelectors = ({
  groupMode,
  keys,
  disabledKeys,
  colors,
  selector,
}: {
  groupMode: GroupMode;
  disabledKeys: string[];
  keys: string[];
  colors: string[];
  selector: { selector: DataSelector; color: string };
}): { selector: DataSelector; color: string }[] => {
  if (groupMode === 'stacked') {
    const { selector: dataSelector } = selector;
    const [index] = dataSelector;
    const selectors: { selector: DataSelector; color: string }[] = [];

    keys.forEach((key: string, idx: number) => {
      if (!disabledKeys.includes(key)) {
        selectors.push({
          selector: [index, key],
          color: colors[idx],
        });
      }
    });

    return selectors;
  }

  return [selector];
};
