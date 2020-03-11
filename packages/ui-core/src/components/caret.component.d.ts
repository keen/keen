import React from 'react';
import { IconType } from '@keen.io/icons';
import { Position } from '../types';
declare type Props = {
  type: Position;
  fill: string;
};
declare const Caret: ({
  type,
  fill,
}: Props) => React.FunctionComponentElement<{
  width?: number;
  height?: number;
  fill?: string;
  type: IconType;
}>;
export default Caret;
