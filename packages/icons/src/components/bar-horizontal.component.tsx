import React from 'react';

import { IconProps } from '../types';

const BarHorizontal = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      fillRule="evenodd"
      d="M18.9104478,55.2238806 L18.9104478,100 L1,100 L1,55.2238806 L18.9104478,55.2238806 Z M100.004975,0 L100.004975,99.5024876 L82.0945274,99.5024876 L82.0945274,0 L100.004975,0 Z M46.2736318,19.9004975 L46.2736318,99.5024876 L28.3631841,99.5024876 L28.3631841,19.9004975 L46.2736318,19.9004975 Z M73.1393035,69.6517413 L73.1393035,99.5024876 L55.2288557,99.5024876 L55.2288557,69.6517413 L73.1393035,69.6517413 Z"
      transform="scale(1 -1) rotate(90 100.502 0)"
    />
  </svg>
);

export default BarHorizontal;
