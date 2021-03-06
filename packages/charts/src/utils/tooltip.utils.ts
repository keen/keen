import { colors } from '@keen.io/colors';
import {
  getFromPath,
  Formatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';
import { Point } from '@keen.io/ui-core';
import { calculateTotalValue } from './circular-chart.utils';

import { OTHERS_DATA_KEY } from './circular-chart.utils';

import { DataSelector } from '../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  disabledLabels?: string[];
  formatValue?: Formatter;
};

export const getCircularChartTooltipContent = ({
  data,
  keys,
  labelSelector,
  selectors,
  disabledLabels = [],
  formatValue,
}: Options) => {
  const content: Point[] = [];

  selectors.length > 1 &&
    content.push({ color: colors.gray[500], data: OTHERS_DATA_KEY });

  selectors.forEach(({ selector, color }) => {
    const item = getFromPath(data, selector);
    const total = keys.reduce((acc, keyName) => {
      return acc + item[keyName];
    }, 0);
    const formattedTotal = valueFormatter(total, formatValue);

    let value = `${formattedTotal}`;
    let label = item[labelSelector];
    let change = '';
    let newColor = color;

    if (selectors.length > 1) {
      const filteredData = data.filter(
        (el) => !disabledLabels.includes(el[labelSelector])
      );
      const allValuesTotal = calculateTotalValue(
        filteredData,
        labelSelector,
        keys
      );
      const valuePercent = String(
        `${(Math.round(total * 100) / allValuesTotal).toFixed(1)}%`
      );
      label = item[labelSelector];
      value = `${formattedTotal}`;
      change = `(${valuePercent})`;
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
