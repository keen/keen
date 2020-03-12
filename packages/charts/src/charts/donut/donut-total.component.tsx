import React, { FC, memo } from 'react';

import { Typography } from '@keen.io/ui-core';

type Props = {
  children: string | number;
} & Typography;

const DonutTotal: FC<Props> = memo(({ children, ...typography }) => {
  const { fontColor, ...rest } = typography;
  return (
    <text
      dx="0"
      dy="0"
      pointerEvents="none"
      style={{ textAnchor: 'middle', fill: fontColor, ...rest }}
    >
      {children}
    </text>
  );
});

DonutTotal.displayName = 'DonutTotal';

export default DonutTotal;
