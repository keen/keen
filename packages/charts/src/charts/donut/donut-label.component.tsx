import React, { FC, memo } from 'react';

import { ColorAdjuster, Typography } from '@keen.io/ui-core';

type Props = {
  position: [number, number];
  children: React.ReactNode;
  sliceBackground: string;
  autocolor: boolean;
} & Typography;

const DonutLabel: FC<Props> = memo(
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
                pointerEvents="none"
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
            pointerEvents="none"
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

DonutLabel.displayName = 'DonutLabel';

export default DonutLabel;
