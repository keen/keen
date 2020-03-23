import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  isHorizontal: boolean;
  left: number;
  width: number;
  background?: string;
};

const OffRange = (props: Props) => {
  const { isHorizontal, left, width, background } = props;

  const layoutStyle = isHorizontal
    ? {
        width,
        height: 4,
        left,
        top: 0,
      }
    : {
        width: 4,
        height: width,
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
