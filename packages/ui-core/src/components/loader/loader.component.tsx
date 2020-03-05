import React, { FC } from 'react';
import Color from 'color';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

type Props = {
  height?: number;
  width?: number;
  fill?: string;
};

const transition = {
  default: { duration: 1.7, ease: 'easeInOut', yoyo: Infinity },
  fill: { duration: 1.7, ease: [1, 0, 0.8, 1], yoyo: Infinity, delay: 0.25 },
};

const createMotion = (color: string) => {
  const [r, g, b] = Color(color)
    .rgb()
    .array();
  return {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: `rgba(${r}, ${g}, ${b}, 0)`,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: color,
    },
  };
};

export const Loader: FC<Props> = ({
  width = 80,
  height = 80,
  fill = colors.blue['500'],
}) => (
  <motion.svg
    width={width}
    height={height}
    viewBox="0 0 143 120"
    style={{
      stroke: fill,
      strokeWidth: 2,
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
    }}
  >
    <g fill="none" fillRule="evenodd">
      <motion.path
        d="M57.6 69 64.385 80.349 47.423 108.72 135.485 108.72 142.2 120 27 120z"
        variants={createMotion(fill)}
        initial="hidden"
        animate="visible"
        transition={transition}
      />
      <motion.path
        d="M0 120 13.462 120 57.667 45.297 74.599 74.013 88.2 74.013 57.737 22.2z"
        variants={createMotion(fill)}
        initial="hidden"
        animate="visible"
        transition={transition}
      />
      <motion.path
        d="M64.2 11.383 108.083 86.278 74.289 86.278 67.518 97.8 128.4 97.8 70.904 0z"
        variants={createMotion(fill)}
        initial="hidden"
        animate="visible"
        transition={transition}
      />
    </g>
  </motion.svg>
);

export default Loader;
