import React from 'react';

import { IconProps } from '../types';

const CaretLeft = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 30 30">
    <polygon
      fill={fill}
      points="20.55 0 24.453519 3.90351896 13.3573737 15 24.453519 26.096481 20.55 30 5.55 15"
    ></polygon>
  </svg>
);

export default CaretLeft;
