import React from 'react';

import { IconProps } from '../types';

const CursorSolid = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <polygon
      fill={fill}
      points="10.472 1 92.28 57.108 91.664 60.011 62.09 65.541 78.024 88.236 77.628 90.473 69.998 95.802 67.755 95.408 51.61 72.411 35.836 99 32.891 98.585 8 2.726"
    />
  </svg>
);

export default CursorSolid;
