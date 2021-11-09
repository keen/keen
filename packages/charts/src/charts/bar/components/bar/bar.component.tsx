import React, { FC, useEffect, useState } from 'react';
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
  isActive?: boolean | null;
  dataSeriesOffset?: [number, number];
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
  dataSeriesOffset,
}) => {
  const [initialDrawFinished, setInitialDraw] = useState(false);
  const barControls = useAnimation();
  const barVariants = {
    ...createBarMotion({
      layout,
      groupMode,
      width,
      height,
      x,
      y,
      color,
      colorOutOfRange,
    }),
  };

  useEffect(() => {
    if (initialDrawFinished) barControls.start(barVariants.animate);
  }, [x, y, width, height]);

  useEffect(() => {
    if (initialDrawFinished) barControls.start(barVariants.defaultColor);
    setInitialDraw(true);
  }, [color]);

  useEffect(() => {
    barControls.start(barVariants.animate);

    if (isActive === null) {
      return;
    }
    if (isActive) {
      barControls.start(barVariants.active);
    } else {
      barControls.start(barVariants.inactive);
    }
  }, [isActive]);

  useEffect(() => {
    barControls.start(barVariants.offsetChange);
  }, [dataSeriesOffset]);

  const commonProps = {
    height,
    width,
    style: {
      ...transitionStyle,
      fill: color,
    },
  };

  return animate ? (
    <motion.rect
      data-testid="bar"
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
