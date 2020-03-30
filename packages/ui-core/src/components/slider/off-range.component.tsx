import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  isHorizontal: boolean;
  left: number;
  size: number;
  thickness: number;
  background?: string;
};

const OffRange = (props: Props) => {
  const { isHorizontal, left, size, thickness, background = '#E1E2E4' } = props;

  const layoutStyle = isHorizontal
    ? {
        width: size,
        height: thickness,
        left,
        top: 0,
      }
    : {
        width: thickness,
        height: size,
        top: left,
        left: 0,
      };

  return (
    <motion.div
      style={{
        position: 'absolute',
        background,
        borderRadius: 3,
        ...layoutStyle,
      }}
    />
  );
};

export default OffRange;
