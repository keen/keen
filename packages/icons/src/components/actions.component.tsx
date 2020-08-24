import React from 'react';

import { IconProps } from '../types';

const Actions = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <path
      fill={fill}
      fillRule="evenodd"
      d="M50 37c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zm37 0c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zm-74 0c7.18 0 13 5.82 13 13s-5.82 13-13 13S0 57.18 0 50s5.82-13 13-13z"
    />
  </svg>
);

export default Actions;
