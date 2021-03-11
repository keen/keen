import {
  formatValue as valueFormatter,
  getFromPath,
  getKeysDifference,
  ScaleSettings,
  TooltipFormatter,
  transformToPercent,
} from '@keen.io/charts-utils';

import { DataSelector } from '../../../types';
import { getLabel } from '../index';

type TooltipSettings = {
  data: Record<string, any>[];
  keys: string[];
  disabledKeys: string[];
  selectors: { selector: DataSelector; color: string }[];
  isPercentage: boolean;
  labelSelector: string;
  formatValue?: TooltipFormatter;
  scaleSettings?: ScaleSettings;
};

const getDistributedChartTooltipSettings = ({
  data,
  keys,
  disabledKeys,
  selectors,
  isPercentage,
  labelSelector,
  formatValue,
  scaleSettings,
}: TooltipSettings) => {
  const { precision, formatLabel } = scaleSettings;

  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  const [firstSelector] = selectors;
  const [index] = firstSelector.selector;

  const isGrouped = data.length > 1;

  const getTooltipLabel = () => {
    if (typeof index === 'number' && (precision || isGrouped)) {
      return `${valueFormatter(data[index][labelSelector], formatLabel)}`;
    }
    return null;
  };

  const totalValue =
    selectors.length > 1
      ? keys.reduce((acc: number, keyName: string) => {
          if (typeof index !== 'number') return acc;
          const value = data[index][keyName];
          if (typeof value !== 'number') return acc;
          return acc + value;
        }, 0)
      : null;

  const percentValue = isPercentage
    ? selectors.reduce((acc, { selector }) => {
        return (
          acc + parseFloat(getFromPath(percentageData, selector).toFixed(2))
        );
      }, 0)
    : null;

  const items = selectors.map(({ color, selector }) => {
    return {
      color,
      data: {
        label: `${selector[1]}`,
        ...getLabel({
          data,
          selector,
          percentageData,
          isPercentage,
          formatValue,
        }),
      },
    };
  });

  return {
    getTooltipLabel,
    percentValue,
    totalValue,
    items,
  };
};

export default getDistributedChartTooltipSettings;
