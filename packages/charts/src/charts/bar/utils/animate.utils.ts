import { Layout } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { GroupMode } from '../../../types';

type BarMotionProps = {
  x: number;
  y: number;
  height: number;
  width: number;
  groupMode: GroupMode;
  layout: Layout;
  color: string;
  colorOutOfRange: boolean;
};

/**
 * Prepare animation for bar
 *
 * @param groupMode - type of groupMode
 * @param layout - layout of the chart
 * @param height - height of the bar
 * @param width - width of the bar
 * @param x - x position of the bar
 * @param y - y position of the bar
 * @param color - bar color
 * @param colorOutOfRange - defines if color is of of range
 * @return animation object with data for framer
 *
 */

export const createBarMotion = ({
  groupMode,
  layout,
  height,
  width,
  x,
  y,
  color,
  colorOutOfRange,
}: BarMotionProps) => {
  const motion = {
    exit: {
      opacity: 0,
    },
    animate: {
      x,
      y,
      height,
      width,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    ...(colorOutOfRange && { defaultColor: { fill: color } }),
    active: {
      opacity: 1,
      ...(colorOutOfRange && { fill: colors.gray[500] }),
    },
    inactive: {
      opacity: 0.2,
    },
  };

  if (groupMode === 'grouped') {
    return {
      ...motion,
      initial: {
        opacity: 0,
        ...(layout === 'vertical'
          ? {
              x,
              y: height + y,
              height: 0,
            }
          : {
              y,
              x,
              width: 0,
            }),
      },
    };
  } else {
    return {
      ...motion,
      initial: {
        opacity: 0,
        x,
        y,
      },
    };
  }
};
