import React from 'react';

import { IconProps } from '../types';

const CaretDown = ({ width, height, fill }: IconProps) => (
  <svg width={width} height={height} viewBox="0 0 30 30">
    <polygon
      fill={fill}
      points="26.096481 5.55 30 9.45351896 15 24.453519 0 9.45351896 3.90351896 5.55 15 16.6465687"
    ></polygon>
  </svg>
);

export default CaretDown;
