import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  isHorizontal: boolean;
  left: number;
  size: number;
  background?: string;
};

const OffRange = (props: Props) => {
  const { isHorizontal, left, size, background } = props;

  const layoutStyle = isHorizontal
    ? {
        width: size,
        height: 4,
        left,
        top: 0,
      }
    : {
        width: 4,
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
