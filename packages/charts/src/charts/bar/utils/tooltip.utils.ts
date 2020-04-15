import { DataSelector, GroupMode, StackMode } from '../../../types';

import { getFromPath } from '../../../utils/selectors.utils';

export const getLabel = ({
  isPercentage,
  selector,
  data,
  percentageData,
}: {
  selector: DataSelector;
  isPercentage: boolean;
  data: Record<string, any>[];
  percentageData: Record<string, any>[];
}) => {
  if (isPercentage) {
    return `${getFromPath(data, selector)} (${getFromPath(
      percentageData,
      selector
    ).toFixed(2)}%)`;
  }

  return getFromPath(data, selector);
};

export const getSelectors = ({
  groupMode,
  stackMode,
  keys,
  disabledKeys,
  colors,
  selector,
}: {
  groupMode: GroupMode;
  stackMode: StackMode;
  disabledKeys: string[];
  keys: string[];
  colors: string[];
  selector: { selector: DataSelector; color: string };
}): { selector: DataSelector; color: string }[] => {
  if (groupMode === 'stacked' && stackMode === 'percent') {
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
