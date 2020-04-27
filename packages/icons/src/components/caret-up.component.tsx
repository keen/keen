import React from 'react';

import { IconProps } from '../types';

const CaretUp = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 30 30">
    <polygon
      fill={fill}
      points="15 5.55 30 20.55 26.096481 24.453519 15.0000667 13.3569503 3.90351896 24.453519 0 20.55"
    ></polygon>
  </svg>
);

export default CaretUp;
