import React from 'react';

import { IconProps } from '../types';

const ButtonArrow = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      d="M73.31 23l26.662 26.662-27.266 27.266-2.51-2.51 23.384-23.39H0v-4h92.198l-21.456-21.46L73.309 23z"
    />
  </svg>
);

export default ButtonArrow;
