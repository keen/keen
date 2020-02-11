import React, { FC, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Tooltip } from '@keen.io/ui-core';

const tooltipMotion = {
  initial: { opacity: 0.5, x: 10 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.2 },
  exit: { opacity: 0, x: 10 },
};

type Props = {
  visible: boolean;
  children: React.ReactNode;
  x: number;
  y: number;
};

const ChartTooltip: FC<Props> = ({ children, visible, x, y }) => {
  const [foreignObject, setForeignObject] = useState({ width: 0, height: 0 });
  const wrapper = useRef(null);

  useEffect(() => {
    if (wrapper.current) {
      const { width, height } = wrapper.current.getBoundingClientRect();
      setForeignObject({ width, height });
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.foreignObject
          pointerEvents="none"
          style={{ overflow: 'visible' }}
          x={x}
          y={y}
          width={foreignObject.width}
          height={foreignObject.height}
          {...tooltipMotion}
        >
          <div
            ref={wrapper}
            style={{
              transform: 'translateY(-50%) translateX(20px)',
              display: 'inline-block',
            }}
          >
            <Tooltip mode="dark" arrowDirection="left">
              {children}
            </Tooltip>
          </div>
        </motion.foreignObject>
      )}
    </AnimatePresence>
  );
};

export default ChartTooltip;
