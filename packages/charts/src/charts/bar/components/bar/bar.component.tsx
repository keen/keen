import React, { FC, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { createBarMotion } from '../../utils/animate.utils';

import { GroupMode } from '../../../../types';

const transitionStyle = { transition: 'fill .2s ease-in' };

type Props = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  colorOutOfRange: boolean;
  layout: Layout;
  groupMode: GroupMode;
  animate?: boolean;
  isActive?: boolean;
};

export const Bar: FC<Props> = ({
  x,
  y,
  width,
  height,
  color,
  colorOutOfRange,
  layout,
  groupMode,
  animate = true,
  isActive,
}) => {
  const barControls = useAnimation();
  const barVariants = {
    ...createBarMotion({ layout, groupMode, width, height, x, y }),
  };

  useEffect(() => {
    barControls.start(barVariants.animate);
  }, [x, y]);

  useEffect(() => {
    barControls.start(barVariants.animate);

    if (typeof isActive !== 'boolean') {
      return;
    }
    if (isActive) {
      barControls.start(barVariants.active);
    } else {
      barControls.start(barVariants.inactive);
    }
  }, [isActive]);

  const commonProps = {
    height,
    width,
    fill: color,
    style: transitionStyle,
  };

  return animate ? (
    <motion.rect
      {...commonProps}
      {...barVariants}
      animate={barControls}
      whileHover={colorOutOfRange && { fill: colors.gray[500] }}
    />
  ) : (
    <rect {...commonProps} x={x} y={y} />
  );
};

export default Bar;
