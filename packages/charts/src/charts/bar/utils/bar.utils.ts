import { transparentize } from 'polished';

import { GroupMode, StackMode } from '../types';
import { DataSelector } from '../../../types';

export const getBarColor = ({
  activeBar,
  barKey,
  barSelector,
  stackMode,
  groupMode,
  color,
}: {
  groupMode: GroupMode;
  stackMode: StackMode;
  color: string;
  barKey: string;
  barSelector: DataSelector;
  activeBar: {
    selector: DataSelector;
    key: string;
  };
}) => {
  if (groupMode === 'stacked' && stackMode === 'normal') {
    const [, activeProperty] = activeBar.selector;
    const [, barProperty] = barSelector;

    if (activeProperty === barProperty) {
      return color;
    }

    if (activeProperty) {
      return transparentize(0.4, color);
    }

    return color;
  }

  if (groupMode === 'stacked' && stackMode === 'percent') {
    const [activeIndex] = activeBar.selector;
    const [barIndex] = barSelector;

    if (activeIndex === barIndex) {
      return transparentize(0.05, color);
    }

    return color;
  }

  return activeBar.key === barKey ? transparentize(0.05, color) : color;
};
