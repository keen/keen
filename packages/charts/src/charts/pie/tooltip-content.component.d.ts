import { FC } from 'react';
import { Typography } from '@keen.io/ui-core';
import { DataSelector } from '../../types';
declare type Props = {
  data: Record<string, any>[];
  keys: string[];
  typography: Typography;
  selectors: {
    selector: DataSelector;
    color: string;
  }[];
};
export declare const TooltipContent: FC<Props>;
export default TooltipContent;
