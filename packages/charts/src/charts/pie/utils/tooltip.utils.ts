import { getFromPath } from '../../../utils';

import { DataSelector } from '../../../types';

type Options = {
  data: Record<string, any>[];
  keys: string[];
  selectors: { selector: DataSelector; color: string }[];
};

export const getTooltipContent = ({ data, keys, selectors }: Options) => {
  const content: { name: string; value: number }[] = [];

  selectors.forEach(({ selector }) => {
    const item = getFromPath(data, selector);
    keys.forEach((keyName: string) => {
      const value = item[keyName];
      content.push({ name: keyName, value });
    });
  });

  return content;
};
