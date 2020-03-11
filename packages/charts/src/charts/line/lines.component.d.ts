import React from 'react';
import { DataSelector, GroupMode, StackMode } from '../../types';
import { Mark, Line, CurveType, StepType } from './types';
declare type Props = {
  lines: Line[];
  marks: Mark[];
  steps: StepType[];
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
  stepMode: boolean;
  onMarkMouseEnter: (
    e: React.MouseEvent,
    selectors: {
      selector: DataSelector;
      color: string;
    }[]
  ) => void;
  onMarkMouseLeave: (e: React.MouseEvent) => void;
};
declare const Lines: ({
  lines,
  marks,
  steps,
  curve,
  stackMode,
  groupMode,
  stepMode,
  onMarkMouseEnter,
  onMarkMouseLeave,
}: Props) => JSX.Element;
export default Lines;
