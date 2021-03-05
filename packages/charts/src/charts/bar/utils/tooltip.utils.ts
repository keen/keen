import {
  getFromPath,
  TooltipFormatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';

import { DataSelector, GroupMode } from '../../../types';

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
  const value = formatValue
    ? valueFormatter(getFromPath(data, selector), formatValue)
    : getFromPath(data, selector);
  if (isPercentage) {
    return {
      value: `${getFromPath(percentageData, selector).toFixed(1)}%`,
      change: `(${value})`,
    };
  }

  return { value };
};

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
