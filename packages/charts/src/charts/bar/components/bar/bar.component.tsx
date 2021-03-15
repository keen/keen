import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';

import { createBarMotion } from '../../utils/animate.utils';

import { GroupMode } from '../../../../types';

const transitionStyle = { transition: 'fill .2s ease-in' };

type Props = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  layout: Layout;
  groupMode: GroupMode;
  animate?: boolean;
};

export const Bar: FC<Props> = ({
  x,
  y,
  width,
  height,
  color,
  layout,
  groupMode,
  animate = true,
}) => {
  const commonProps = {
    height,
    width,
    fill: color,
    style: transitionStyle,
  };

  return animate ? (
    <motion.rect
      {...commonProps}
      {...createBarMotion({ layout, groupMode, width, height, x, y })}
    />
  ) : (
    <rect {...commonProps} x={x} y={y} />
  );
};

export default Bar;
