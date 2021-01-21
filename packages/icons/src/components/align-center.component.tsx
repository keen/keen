import React from 'react';

import { IconProps } from '../types';

const AlignLeft = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M96,87 L100,91 L100,96 L96,100 L4,100 L0,96 L0,91 L4,87 L96,87 Z M78,58 L82,62 L82,67 L78,71 L22,71 L18,67 L18,62 L22,58 L78,58 Z M96,29 L100,33 L100,38 L96,42 L4,42 L0,38 L0,33 L4,29 L96,29 Z M78,0 L82,4 L82,9 L78,13 L22,13 L18,9 L18,4 L22,0 L78,0 Z"
    />
  </svg>
);

export default AlignLeft;
