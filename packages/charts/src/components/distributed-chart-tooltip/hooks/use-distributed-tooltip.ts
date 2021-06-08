import { useMemo, useCallback } from 'react';
import {
  formatValue,
  getFromPath,
  getKeysDifference,
  transformToPercent,
} from '@keen.io/charts-utils';

import { getLabel } from '../utils';

import { DataSelector, TooltipSettings } from '../../../types';

export type TooltipConfig = {
  /** Data series */
  data: Record<string, any>[];
  /** Keys used in data series */
  keys: string[];
  /** Disabled data series */
  disabledKeys: string[];
  /** Tooltip data selectors */
  selectors: { selector: DataSelector; color: string }[];
  /** Label selector */
  labelSelector: string;
  /** Tooltip settings */
  tooltipSettings: TooltipSettings;
  /** Date label indicator */
  isTimePrecise?: boolean;
  /** Data is in percentage */
  isPercentage?: boolean;
  /** Data is stacked */
  isStacked?: boolean;
};

const useDistributedTooltip = ({
  data,
  keys,
  disabledKeys,
  selectors,
  labelSelector,
  tooltipSettings,
  isTimePrecise = false,
  isPercentage = false,
  isStacked = false,
}: TooltipConfig) => {
  const [{ selector }] = selectors;
  const [recordIndex] = selector as [number];

  const percentageData =
    isPercentage && isStacked
      ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
      : [];

  const getTooltipLabel = useCallback(
    (
      record: Record<string, any>,
      labelSelector: string,
      isGrouped: boolean
    ) => {
      const label = record[labelSelector];
      if (isTimePrecise) {
        return tooltipSettings?.formatTime
          ? tooltipSettings.formatTime(label)
          : label.toString();
      }
      return isGrouped ? record[labelSelector] : null;
    },
    [isTimePrecise, tooltipSettings.formatTime]
  );

  const totalValue = useMemo(() => {
    if (isStacked && selectors.length > 1) {
      const total = getKeysDifference(keys, disabledKeys).reduce(
        (acc: number, keyName: string) => {
          const value = data[recordIndex][keyName];
          return acc + value;
        },
        0
      );
      return formatValue(total, tooltipSettings.formatValue) as string;
    }
    return null;
  }, [selectors.length > 1, recordIndex, disabledKeys]);

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
          formatValue: tooltipSettings.formatValue,
        }),
      },
    };
  });

  return {
    label: getTooltipLabel(data[recordIndex], labelSelector, data.length > 1),
    percentValue,
    totalValue,
    items,
  };
};

export default useDistributedTooltip;
