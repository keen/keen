import React from 'react';

import { IconProps } from '../types';

const AlignRight = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M96,87 L100,91 L100,96 L96,100 L4,100 L0,96 L0,91 L4,87 L96,87 Z M96,58 L100,62 L100,67 L96,71 L40,71 L36,67 L36,62 L40,58 L96,58 Z M96,29 L100,33 L100,38 L96,42 L4,42 L0,38 L0,33 L4,29 L96,29 Z M96,0 L100,4 L100,9 L96,13 L40,13 L36,9 L36,4 L40,0 L96,0 Z"
    />
  </svg>
);

export default AlignRight;
