import React from 'react';
import { Layout } from '@keen.io/ui-core';
import { Bar } from './types';
import { DataSelector, GroupMode, StackMode } from '../../types';
declare type Props = {
  bars: Bar[];
  onBarMouseEnter: (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    key: string,
    dataSelector: {
      selector: DataSelector;
      color: string;
    },
    markPosition: {
      x: number;
      y: number;
    }
  ) => void;
  onBarMouseLeave: (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    key: string
  ) => void;
  layout: Layout;
  stackMode: StackMode;
  groupMode: GroupMode;
};
declare const Bars: ({
  bars,
  groupMode,
  stackMode,
  layout,
  onBarMouseEnter,
  onBarMouseLeave,
}: Props) => JSX.Element;
export default Bars;
