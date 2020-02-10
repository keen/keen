import React, { memo } from 'react';

import { colors } from '@keen.io/colors';

type Props = {
  x: number;
  y: number;
  color: string;
};

const Mark = ({ color, x, y }: Props) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="10"
      stroke={colors.white['500']}
      strokeWidth="4"
      fill={color}
    />
    <circle cx={x} cy={y} r="4" fill={colors.white['500']} />
  </g>
);

export default memo(Mark);
