import React from 'react';

import { IconProps } from '../types';

const CaretRight = ({ width, height, fill }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 30 30">
    <polygon
      fill={fill}
      points="9.45351896 0 24.453519 15 9.45351896 30 5.55 26.096481 16.6465765 15 5.55 3.90351896"
    />
  </svg>
);

export default CaretRight;
