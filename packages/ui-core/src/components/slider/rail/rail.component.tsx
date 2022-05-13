import React, { FC } from 'react';

import { stringifyColors } from '../utils';

import { Layout } from '../../../types';

type Props = {
  type: Layout;
  size: number;
  borderRadius: number;
  colors: string[];
  zeroPoint?: number;
};

const Rail: FC<Props> = ({ type, colors, zeroPoint, borderRadius, size }) => {
  const gradientAngle = type === 'horizontal' ? 90 : 180;
  const layoutStyles =
    type === 'horizontal'
      ? {
          width: '100%',
          height: `${size}px`,
          top: '50%',
          transform: 'translateY(-50%)',
        }
      : {
          height: '100%',
          width: `${size}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        };

  const background =
    colors.length > 1
      ? `linear-gradient(${gradientAngle}deg, ${stringifyColors(
          colors,
          zeroPoint
        )}`
      : colors[0];

  return (
    <div
      data-testid="slider-rail"
      style={{
        position: 'absolute',
        borderRadius,
        background,
        ...layoutStyles,
      }}
    />
  );
};

export default Rail;
