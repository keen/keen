import React, { FC, memo } from 'react';

import { ColorAdjuster, Typography } from '@keen/ui-core';

type Props = {
  position: [number, number];
  children: React.ReactNode;
  sliceBackground: string;
  autocolor: boolean;
} & Typography;

const PieLabel: FC<Props> = memo(
  ({
    position,
    sliceBackground,
    autocolor,
    children,
    fontColor,
    ...typography
  }) => {
    return (
      <>
        {autocolor ? (
          <ColorAdjuster baseColor={sliceBackground}>
            {adjustedColor => (
              <text
                fill={adjustedColor}
                transform={`translate(${position})`}
                style={{ textAnchor: 'middle', ...typography }}
              >
                {children}
              </text>
            )}
          </ColorAdjuster>
        ) : (
          <text
            fill={fontColor}
            transform={`translate(${position})`}
            style={{ textAnchor: 'middle', ...typography }}
          >
            {children}
          </text>
        )}
      </>
    );
  }
);

PieLabel.displayName = 'PieLabel';

export default PieLabel;
