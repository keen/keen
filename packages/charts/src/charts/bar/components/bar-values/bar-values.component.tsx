import React, { FC, useContext } from 'react';
import { motion } from 'framer-motion';
import { ColorAdjuster } from '@keen.io/ui-core';

import { ChartContext, ChartContextType } from '../../../../contexts';

import { Bar } from '../../types';

export const createTextMotion = (x: number, y: number) => ({
  initial: { opacity: 0, x, y },
  animate: {
    opacity: 1,
    x,
    y,
  },
  transition: { duration: 0.4 },
  exit: {},
});

type Props = {
  bars: Bar[];
  autocolor: boolean;
};

const BarValues: FC<Props> = ({ bars, autocolor }) => {
  const {
    theme: { bar },
  } = useContext(ChartContext) as ChartContextType;

  const { fontColor, ...typography } = bar.values.typography;
  const textProps = {
    pointerEvents: 'none',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    style: typography,
  };

  return (
    <>
      {bars.map(({ key, x, y, width, height, value, color }) => {
        const textMotion = createTextMotion(x + width / 2, y + height / 2);

        return autocolor ? (
          <ColorAdjuster key={key} baseColor={color}>
            {(adjustedColor) => (
              <motion.text
                key={key}
                fill={adjustedColor}
                {...textProps}
                {...textMotion}
              >
                {value}
              </motion.text>
            )}
          </ColorAdjuster>
        ) : (
          <motion.text
            fill={fontColor}
            key={key}
            {...textProps}
            {...textMotion}
          >
            {value}
          </motion.text>
        );
      })}
    </>
  );
};

export default BarValues;
