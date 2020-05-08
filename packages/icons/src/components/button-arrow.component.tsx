import React from 'react';

import { IconProps } from '../types';

const ButtonArrow = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M73.3093944,23 L99.9717362,49.6623418 L72.7060915,76.9279866 L70.1952122,74.4171073 L93.58,51.028 L0,51.0286038 L0,47.0286038 L92.198,47.028 L70.7417001,25.5676942 L73.3093944,23 Z"
    />
  </svg>
);

export default ButtonArrow;
