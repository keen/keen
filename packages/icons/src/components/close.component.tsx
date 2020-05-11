import React from 'react';

import { IconProps } from '../types';

const Close = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 30 30">
    <polygon
      fill={fill}
      fillRule="evenodd"
      points="30 3.09018565 20.1444255 14.9998671 29.8990868 26.7981678 26.9098143 30 14.9998671 19.1444255 3.20183221 29.8990868 4.68449064e-14 26.9098143 9.85530872 14.9998671 0.100913216 3.20183221 3.09018565 1.13915398e-13 14.9998671 10.8553087 26.7981678 0.100913216"
    ></polygon>
  </svg>
);

export default Close;
