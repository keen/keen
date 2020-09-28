import React from 'react';

import { IconProps } from '../types';

const FunnelVertical = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <polygon
      fill={fill}
      points="94.681 0 5.921 0 3 8.043 38.677 37.888 38.677 83.404 40.067 86.678 53.858 100 61.572 96.726 61.571 37.902 97.586 8.057"
    />
  </svg>
);

export default FunnelVertical;
