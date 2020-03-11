import React from 'react';
import { Line as LineType } from '../../types';
declare type Props = {
  color?: string;
  stroke?: number;
} & LineType;
declare const _default: React.MemoExoticComponent<({
  color,
  stroke,
  ...props
}: Props) => JSX.Element>;
export default _default;
