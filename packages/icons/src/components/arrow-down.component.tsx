import React from 'react';

import { IconProps } from '../types';

const ArrowDown = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 24 30">
    <polygon
      fill={fill}
      fillRule="evenodd"
      points="10.768 0 10.768 23.16 3.245 15.637 .776 18.106 12.414 29.744 24.052 18.106 21.583 15.637 14.06 23.16 14.06 0"
      transform="translate(0 .256)"
    />
  </svg>
);

export default ArrowDown;
