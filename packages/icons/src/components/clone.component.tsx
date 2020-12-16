import React from 'react';

import { IconProps } from '../types';

const Clone = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M20,30 L20,66 L34,80 L70,80 L70,90 L60,100 L10,100 L0,90 L0,40 L10,30 L20,30 Z M90,0 L100,10 L100,60 L90,70 L40,70 L30,60 L30,10 L40,0 L90,0 Z"
    />
  </svg>
);

export default Clone;
