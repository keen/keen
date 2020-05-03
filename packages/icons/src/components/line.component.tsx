import React from 'react';

import { IconProps } from '../types';

const Line = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 12 3">
    <line
      x1="208"
      x2="220"
      y1="465.5"
      y2="465.5"
      fill="none"
      stroke={fill}
      strokeWidth="3"
      transform="translate(-208 -464)"
    />
  </svg>
);

export default Line;
