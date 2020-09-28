import React from 'react';

import { IconProps } from '../types';

const CornerTick = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <polygon
      fill={fill}
      points="47.07 2.881 30.519 9.734 30.519 126.028 47.07 132.881 105.243 74.734 105.243 61.028"
      transform="rotate(45 67.881 67.881)"
    />
  </svg>
);

export default CornerTick;
