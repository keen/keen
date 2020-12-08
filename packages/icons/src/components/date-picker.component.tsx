import React from 'react';

import { IconProps } from '../types';

const DatePicker = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      fillRule="evenodd"
      d="M16.6666667,0 L16.6666667,10 L11.1111111,10 C5,10 0,14.5 0,20 L0,90 C0,95.5 5,100 11.1111111,100 L88.8888889,100 C95,100 100,95.5 100,90 L100,20 C100,14.5 95,10 88.8888889,10 L83.3333333,10 L83.3333333,0 L72.2222222,0 L72.2222222,10 L27.7777778,10 L27.7777778,0 L16.6666667,0 Z M11.1111111,35 L88.8888889,35 L88.8888889,90 L11.1111111,90 L11.1111111,35 Z"
    />
  </svg>
);

export default DatePicker;
