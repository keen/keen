import React from 'react';

import { IconProps } from '../types';

const Close = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 98 96">
    <path
      fill="none"
      stroke={fill}
      strokeLinecap="square"
      strokeWidth={5}
      d="M1.083.083l95.834 95.834m0-95.834L1.083 95.917"
    />
  </svg>
);

export default Close;
