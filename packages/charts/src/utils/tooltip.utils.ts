import { colors } from '@keen.io/colors';
import { getFromPath } from './selectors.utils';
import { calculateTotalValue } from './circular-chart.utils';

import { OTHERS_DATA_KEY } from './circular-chart.utils';

import { DataSelector } from '../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  disabledLabels?: string[];
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
}: Options) => {
  const content: { color: string; value: string }[] = [];

  selectors.length > 1 &&
    content.push({ color: colors.gray[500], value: OTHERS_DATA_KEY });

  selectors.forEach(({ selector, color }) => {
    const item = getFromPath(data, selector);
    const total = keys.reduce((acc, keyName) => {
      return acc + item[keyName];
    }, 0);

    let value = `${item[labelSelector]} - ${total}`;
    let newColor = color;

    if (selectors.length > 1) {
      const filteredData = data.filter(
        el => !disabledLabels.includes(el[labelSelector])
      );
      const allValuesTotal = calculateTotalValue(
        filteredData,
        labelSelector,
        keys
      );
      const valuePercent = String(
        `${(Math.round(total * 100) / allValuesTotal).toFixed(1)}%`
      );
      value = `${item[labelSelector]} - ${total} (${valuePercent})`;
      newColor = 'rgba(0, 0, 0, 0)';
    }

    content.push({ color: newColor, value });
  });

  return content;
};
