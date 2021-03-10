import { useContext } from 'react';
import {
  formatValue as valueFormatter,
  getFromPath,
  getKeysDifference,
  TooltipFormatter,
  transformToPercent,
} from '@keen.io/charts-utils';

import { ChartContext, ChartContextType } from '../contexts';
import { DataSelector } from '../types';
import { getLabel } from '../components/distributed-chart-tooltip';

const useDistributedChartTooltipSettings = (
  data: Record<string, any>[],
  keys: string[],
  disabledKeys: string[],
  selectors: { selector: DataSelector; color: string }[],
  isPercentage: boolean,
  labelSelector: string,
  maxWidth?: number,
  formatValue?: TooltipFormatter
) => {
  const { xScaleSettings } = useContext(ChartContext) as ChartContextType;
  const { precision, formatLabel } = xScaleSettings;

  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];

  const [firstSelector] = selectors;
  const [index] = firstSelector.selector;

  const tooltipLabel =
    precision && typeof index === 'number'
      ? valueFormatter(data[index][labelSelector], formatLabel)
      : null;

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
    tooltipLabel,
    percentValue,
    totalValue,
    items,
  };
};

export default useDistributedChartTooltipSettings;
