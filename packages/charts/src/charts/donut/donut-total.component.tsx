import React, { FC, memo } from 'react';

import { Typography } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

type Props = {
  children: string | number;
} & Typography;

const DonutTotal: FC<Props> = memo(({ children, ...typography }) => {
  const { fontColor, ...rest } = typography;
  const { fontSize, fontFamily } = rest;
  const totalLabelSize = 14;
  return (
    <text
      y={`-${totalLabelSize / 2}`}
      pointerEvents="none"
      style={{
        textAnchor: 'middle',
        dominantBaseline: 'middle',
      }}
    >
      <tspan
        style={{
          fill: fontColor,
          ...rest,
        }}
      >
        {children}
      </tspan>
      <tspan
        x="0"
        dy={totalLabelSize + fontSize / 2}
        style={{
          fontFamily,
          fontSize: totalLabelSize,
          fill: colors.black['300'],
        }}
      >
        Total
      </tspan>
    </text>
  );
});

DonutTotal.displayName = 'DonutTotal';

export default DonutTotal;
