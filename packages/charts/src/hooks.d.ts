import React from 'react';
import { DataSelector } from './types';
export declare const useTooltip: (
  container: React.MutableRefObject<any>,
  debounce?: number
) => {
  hideTooltip: () => void;
  updateTooltipPosition: (
    e: React.MouseEvent<Element, MouseEvent>,
    selectors: {
      selector: DataSelector;
      color: string;
    }[]
  ) => void;
  tooltipSelectors: {
    selector: DataSelector;
    color: string;
  }[];
  tooltipPosition: {
    x: number;
    y: number;
  };
  tooltipVisible: boolean;
};
