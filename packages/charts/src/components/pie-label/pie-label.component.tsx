import React, { FC, memo } from 'react';

import { ColorAdjuster, Typography } from '@keen.io/ui-core';

type Props = {
  children: React.ReactNode;
  sliceBackground: string;
  autocolor: boolean;
} & Typography;

const PieLabel: FC<Props> = memo(
  ({ sliceBackground, autocolor, children, fontColor, ...typography }) => {
    return (
      <>
        {autocolor ? (
          <ColorAdjuster baseColor={sliceBackground}>
            {adjustedColor => (
              <text
                fill={adjustedColor}
                pointerEvents="none"
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
