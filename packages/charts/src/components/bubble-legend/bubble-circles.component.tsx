import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { legendRadius, opacityScale } from './bubble-legend.utils';

type Props = {
  domain: number[];
  offsetTop?: number;
};

export const Circles: FC<Props> = ({ offsetTop }) => {
  const maxRange = Math.max(...legendRadius);
  const minRange = Math.min(...legendRadius);
  const xCircle = maxRange;
  const yCircle = offsetTop ? maxRange * 2 + offsetTop : maxRange * 2;

  const circleOpacityScale = opacityScale([minRange, maxRange], 0.3);

  return (
    <>
      {legendRadius.map(radius => {
        const x = xCircle;
        const y = yCircle - radius;

        return (
          <motion.circle
            key={`cirlce-${radius}`}
            cx={x}
            cy={y}
            r={radius}
            fill={colors.gray['500']}
            fillOpacity={circleOpacityScale(radius)}
          />
        );
      })}
    </>
  );
};

export default Circles;
