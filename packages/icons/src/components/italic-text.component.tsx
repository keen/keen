import React from 'react';

import { IconProps } from '../types';

const ItalicText = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <polygon
      fill={fill}
      points="64.274 100 66.49 90.262 47.394 90.262 66.064 9.738 85.16 9.738 87.377 0 35.753 0 33.537 9.738 52.633 9.738 33.962 90.262 14.866 90.262 12.65 100"
    />
  </svg>
);

export default ItalicText;
