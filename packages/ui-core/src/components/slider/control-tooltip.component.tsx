import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { ContainerTooltip } from './slider.styles';
import { Position } from '../../types';

type Props = {
  tooltipPosition: Position;
  size: number;
  children: React.ReactNode;
  pos: number;
};

export const ControlTooltip = ({
  tooltipPosition,
  size,
  children,
  pos,
}: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = state;

  useEffect(() => {
    setState({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
  }, [ref.current, pos]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2 }}
    >
      <ContainerTooltip
        ref={ref}
        type={tooltipPosition}
        awidth={width}
        aheight={height}
        size={size}
      >
        {children}
      </ContainerTooltip>
    </motion.div>
  );
};

export default ControlTooltip;
