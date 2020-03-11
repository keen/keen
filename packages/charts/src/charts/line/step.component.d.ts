import React from 'react';
import { StepType, Mark } from './types';
declare type Props = {
  steps: StepType[];
  marks: Record<number, Mark[]>;
  onMouseEnter: (e: React.MouseEvent, mark: StepType) => void;
  onMouseMove: (e: React.MouseEvent, mark: StepType) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
};
declare const Step: ({
  steps,
  marks,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}: Props) => JSX.Element;
export default Step;
