import { getFromPath } from './selectors.utils';

import { DataSelector } from '../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
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
