import React, { FC, memo } from 'react';

import { Typography } from '@keen.io/ui-core';

type Props = {
  children: string | number;
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
  // const { fontColor, ...rest } = typography;
  // const { fontSize, fontFamily } = rest;
  // const totalLabelSize = 14;
  // return (
  //   <text
  //     y={`-${totalLabelSize / 2}`}
  //     pointerEvents="none"
  //     style={{
  //       textAnchor: 'middle',
  //       dominantBaseline: 'middle',
  //     }}
  //   >
  //     <tspan
  //       style={{
  //         fill: fontColor,
  //         ...rest,
  //       }}
  //     >
  //       {children}
  //     </tspan>
  //     <tspan
  //       x="0"
  //       dy={totalLabelSize + fontSize / 2}
  //       style={{
  //         fontFamily,
  //         fontSize: totalLabelSize,
  //         fill: colors.black['300'],
  //       }}
  //     >
  //       Total
  //     </tspan>
  //   </text>
  // );
});

DonutTotal.displayName = 'DonutTotal';

export default DonutTotal;
