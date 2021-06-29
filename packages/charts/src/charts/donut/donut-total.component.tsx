import React, { FC, memo } from 'react';

import { Typography } from '@keen.io/ui-core';

type Props = {
  /* React children nodes */
  children: React.ReactNode;
  /** Theme settings for total value typography */
  total: {
    label: Typography;
    value: Typography;
  };
};

const DonutTotal: FC<Props> = memo(({ children, total }) => {
  const { label, value } = total;
  const { fontColor: labelColor, ...labelTypography } = label;
  const { fontColor: valueColor, ...valueTypography } = value;
  return (
    <text
      y={`-${label.fontSize / 2}`}
      pointerEvents="none"
      style={{
        textAnchor: 'middle',
        dominantBaseline: 'middle',
      }}
    >
      <tspan
        style={{
          fill: valueColor,
          ...valueTypography,
        }}
      >
        {children}
      </tspan>
      <tspan
        x="0"
        dy={label.fontSize + value.fontSize / 2}
        style={{
          fill: labelColor,
          ...labelTypography,
        }}
      >
        Total
      </tspan>
    </text>
  );
});

DonutTotal.displayName = 'DonutTotal';

export default DonutTotal;
