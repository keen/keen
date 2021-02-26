import { colors } from '@keen.io/colors';
import { getFromPath } from '@keen.io/charts-utils';
import { calculateTotalValue } from './circular-chart.utils';

import { OTHERS_DATA_KEY } from './circular-chart.utils';

import { DataSelector, TooltipFormatter } from '../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  disabledLabels?: string[];
  formatValue?: TooltipFormatter;
};

export const getTooltipContent = ({
  data,
  keys,
  labelSelector,
  selectors,
}: Options) => {
  const content: { color: string; value: string }[] = [];

  selectors.forEach(({ selector, color }) => {
    const item = getFromPath(data, selector);
    const total = keys.reduce((acc, keyName) => {
      return acc + item[keyName];
    }, 0);

    content.push({ color, value: `${item[labelSelector]} - ${total}` });
  });

  return content;
};

export const getCircularChartTooltipContent = ({
  data,
  keys,
  labelSelector,
  selectors,
  disabledLabels,
  formatValue,
}: Options) => {
  const content: {
    color: string;
    value?: string;
    label?: string;
    change?: string;
  }[] = [];

  selectors.length > 1 &&
    content.push({ color: colors.gray[500], label: OTHERS_DATA_KEY });

  selectors.forEach(({ selector, color }) => {
    const item = getFromPath(data, selector);
    const total = keys.reduce((acc, keyName) => {
      return acc + item[keyName];
    }, 0);
    const formattedTotal = formatValue ? formatValue(total) : total;

    let value = `${formattedTotal}`;
    let label = `${item[labelSelector]} :`;
    let change;
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
      label = `${item[labelSelector]}:`;
      value = `${formattedTotal}`;
      change = `(${valuePercent})`;
      newColor = 'rgba(0, 0, 0, 0)';
    }

    content.push({ color: newColor, value, label, change });
  });

  return content;
};
