import { colors } from '@keen.io/colors';
import {
  getFromPath,
  Formatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';
import { Point } from '@keen.io/ui-core';
import { calculateTotalValue } from './circular-chart.utils';

import { OTHERS_DATA_KEY } from './circular-chart.utils';

import { DataSelector, CircularChartValueMode } from '../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  disabledLabels?: string[];
  formatValue?: Formatter;
  valueMode?: CircularChartValueMode;
};

export const getCircularChartTooltipContent = ({
  data,
  keys,
  labelSelector,
  selectors,
  disabledLabels = [],
  formatValue,
  valueMode,
}: Options) => {
  const content: Point[] = [];
  const isPercentageMode = valueMode === 'percentage';

  selectors.length > 1 &&
    content.push({ color: colors.gray[500], data: OTHERS_DATA_KEY });

  const filteredData = data.filter(
    (el) => !disabledLabels.includes(el[labelSelector])
  );
  const allValuesTotal = calculateTotalValue(filteredData, labelSelector, keys);

  selectors.forEach(({ selector, color }) => {
    const item = getFromPath(data, selector);
    const total = keys.reduce((acc, keyName) => {
      return acc + item[keyName];
    }, 0);
    const formattedTotal = valueFormatter(total, formatValue);

    const valuePercent = String(
      `${(Math.round(total * 100) / allValuesTotal).toFixed(1)}%`
    );

    const value = isPercentageMode ? valuePercent : `${formattedTotal}`;
    let label = item[labelSelector];
    const change = isPercentageMode
      ? `(${formattedTotal})`
      : `(${valuePercent})`;
    let newColor = color;

    if (selectors.length > 1) {
      label = item[labelSelector];
      newColor = 'rgba(0, 0, 0, 0)';
    }

    content.push({
      color: newColor,
      data: {
        label,
        value,
        change,
      },
    });
  });

  return content;
};
