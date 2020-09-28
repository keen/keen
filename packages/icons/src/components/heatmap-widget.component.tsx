import React from 'react';

import { IconProps } from '../types';

const HeatmapWidget = ({ width, height, opacity, fill }: IconProps) => (
  <svg width={width} height={height} opacity={opacity} viewBox="0 0 100 100">
    <g fill={fill} fillRule="evenodd">
      <rect width="26" height="26" opacity=".5" />
      <rect width="26" height="26" x="37" opacity=".5" />
      <rect width="26" height="26" x="74" opacity=".3" />
      <rect width="26" height="26" y="37" opacity=".9" />
      <rect width="26" height="26" x="37" y="37" opacity=".7" />
      <rect width="26" height="26" x="74" y="37" opacity=".3" />
      <rect width="26" height="26" y="74" />
      <rect width="26" height="26" x="37" y="74" opacity=".9" />
      <rect width="26" height="26" x="74" y="74" opacity=".7" />
    </g>
  </svg>
);

export default HeatmapWidget;
