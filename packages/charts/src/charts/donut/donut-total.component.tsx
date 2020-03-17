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
    <>
      <text
        dx="0"
        dy="0"
        pointerEvents="none"
        style={{
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          fill: fontColor,
          ...rest,
        }}
      >
        {children}
      </text>
      <text
        style={{
          fontFamily,
          fontSize: totalLabelSize,
          fill: colors.black['300'],
          textAnchor: 'middle',
        }}
        dy={totalLabelSize + fontSize / 2}
      >
        Total
      </text>
    </>
  );
});

DonutTotal.displayName = 'DonutTotal';

export default DonutTotal;
