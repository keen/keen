import React from 'react';
import { Mark } from './types';
declare type Props = {
  marks: Mark[];
  onMouseEnter?: (e: React.MouseEvent, mark: Mark) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};
declare const Marks: ({
  marks,
  onMouseEnter,
  onMouseLeave,
}: Props) => JSX.Element;
export default Marks;
