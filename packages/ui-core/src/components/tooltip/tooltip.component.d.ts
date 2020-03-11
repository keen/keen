import React from 'react';
import { Position, Typography } from '../../types';
export declare type TooltipMode = 'light' | 'dark';
declare type Props = Partial<Typography> & {
  children: React.ReactNode | string;
  mode?: TooltipMode;
  backgroundColor?: string;
  borderRadius?: string;
  hasShadow?: boolean;
  hasArrow?: boolean;
  arrowDirection?: Position;
};
declare const Tooltip: {
  ({ children, mode, arrowDirection, ...props }: Props): JSX.Element;
  defaultProps: {
    backgroundColor: string;
    fontColor: string;
    mode: string;
    borderRadius: string;
    hasShadow: boolean;
    hasArrow: boolean;
    arrowDirection: string;
  };
};
export default Tooltip;
