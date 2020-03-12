import React, { FC, useContext } from 'react';
import { ColorAdjuster } from '@keen.io/ui-core';

import { ChartContext, ChartContextType } from '../../contexts';

import { Bar } from './types';

type Props = {
  bars: Bar[];
  autocolor: boolean;
};

const BarValues: FC<Props> = ({ bars, autocolor }) => {
  const {
    theme: { bar },
  } = useContext(ChartContext) as ChartContextType;
  const { fontColor, ...typography } = bar.values.typography;

  return (
    <>
      {bars.map(({ key, x, y, width, height, value, color }, idx) => {
        const textProps = {
          pointerEvents: 'none',
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          style: typography,
          x: x + width / 2,
          y: y + height / 2,
        };

        return autocolor ? (
          <ColorAdjuster key={`${key}-${idx}`} baseColor={color}>
            {adjustedColor => (
              <text fill={adjustedColor} {...textProps}>
                {value}
              </text>
            )}
          </ColorAdjuster>
        ) : (
          <text fill={fontColor} key={`${key}-${idx}`} {...textProps}>
            {value}
          </text>
        );
      })}
    </>
  );
};

export default BarValues;
