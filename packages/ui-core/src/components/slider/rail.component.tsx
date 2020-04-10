import React, { FC } from 'react';

import { stringifyColors } from './utils';

import { Layout } from '../../types';

type Props = {
  type: Layout;
  size: number;
  colors: string[];
  colorSteps: number;
};

const Rail: FC<Props> = ({ type, colors, colorSteps, size }) => {
  const gradientAngle = type === 'horizontal' ? 90 : 180;
  const dimension =
    type === 'horizontal'
      ? {
          width: '100%',
          height: `${size}px`,
        }
      : {
          height: '100%',
          width: `${size}px`,
        };

  const background =
    colorSteps > 1
      ? `linear-gradient(${gradientAngle}deg, ${stringifyColors(
          colors,
          colorSteps
        )}`
      : colors[0];

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: 3,
        background,
        ...dimension,
      }}
    />
  );
};

export default Rail;
