import React from 'react';

import { IconProps } from '../types';

const Plus = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <polygon
      fill={fill}
      points="57.875 100 57.875 57.329 98.337 57.329 98.337 42.47 57.875 42.47 57.875 0 41.911 0 41.911 42.47 1.65 42.47 1.65 57.329 41.911 57.329 41.911 100"
    />
  </svg>
);

export default Plus;
