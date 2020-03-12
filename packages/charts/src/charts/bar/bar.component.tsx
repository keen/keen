import React, { FC } from 'react';
import { motion } from 'framer-motion';

const transitionStyle = { transition: 'fill .2s ease-in' };

const rectMotion = {
  initial: false,
  transition: { ease: 'easeOut', duration: 0.25 },
};

type Props = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  animate?: boolean;
};

export const Bar: FC<Props> = ({
  x,
  y,
  width,
  height,
  color,
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
      {...rectMotion}
      animate={{
        width,
        height,
        x,
        y,
      }}
      x={0}
      y={0}
    />
  ) : (
    <rect {...commonProps} x={x} y={y} />
  );
};

export default Bar;
