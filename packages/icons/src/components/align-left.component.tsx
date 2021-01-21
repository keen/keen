import React from 'react';

import { IconProps } from '../types';

const AlignCenter = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M96,87 L100,91 L100,96 L96,100 L4,100 L0,96 L0,91 L4,87 L96,87 Z M60,58 L64,62 L64,67 L60,71 L4,71 L0,67 L0,62 L4,58 L60,58 Z M96,29 L100,33 L100,38 L96,42 L4,42 L0,38 L0,33 L4,29 L96,29 Z M60,0 L64,4 L64,9 L60,13 L4,13 L0,9 L0,4 L4,0 L60,0 Z"
    />
  </svg>
);

export default AlignCenter;
