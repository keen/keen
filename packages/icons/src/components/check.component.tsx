import React from 'react';

import { IconProps } from '../types';

const Check = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 30 26">
    <polygon
      fill={fill}
      points="25.546 .45 30 4.038 12.629 25.599 0 12.809 4.07 8.791 12.196 17.02"
    />
  </svg>
);

export default Check;
