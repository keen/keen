import React, { memo } from 'react';

import { colors } from '@keen.io/colors';

type Props = {
  x: number;
  y: number;
  color: string;
  outerRadius?: number;
  innerRadius?: number;
  strokeWidth?: number;
};

export const markMotion = {
  initial: { opacity: 0.3, scale: 0.2 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0, scale: 0.3 },
};

const Mark = ({
  color,
  x,
  y,
  outerRadius = 10,
  innerRadius = 4,
  strokeWidth = 4,
}: Props) => (
  <g pointerEvents="none">
    <circle
      cx={x}
      cy={y}
      r={outerRadius}
      stroke={colors.white['500']}
      strokeWidth={strokeWidth}
      fill={color}
    />
    <circle cx={x} cy={y} r={innerRadius} fill={colors.white['500']} />
  </g>
);

export default memo(Mark);
