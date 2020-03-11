import React from 'react';
import { Orientation } from '../../types';
declare type Props = {
  x: number;
  y: number;
  size: number;
  orientation: Orientation;
  color?: string;
  children?: React.ReactNode;
};
declare const _default: React.MemoExoticComponent<({
  x,
  y,
  orientation,
  size,
  color,
  children,
}: Props) => JSX.Element>;
export default _default;
