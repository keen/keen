import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, Position } from '@keen.io/ui-core';

import { ChartContext, ChartContextType } from '../../contexts';

import { calculateTooltipPosition } from './chart-tooltip.utils';

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

  const { svgDimensions, margins, theme } = useContext(
    ChartContext
  ) as ChartContextType;

  useEffect(() => {
    if (wrapper.current) {
      const { width, height } = wrapper.current.getBoundingClientRect();
      setForeignObject({ width, height });
    }
  }, [visible]);

  const {
    tooltipX,
    tooltipY,
    transform,
    arrowDirection,
    arrowTop,
  } = calculateTooltipPosition({
    svgDimensions,
    margins,
    x,
    y,
    ...foreignObject,
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.foreignObject
          pointerEvents="none"
          style={{ overflow: 'visible' }}
          x={tooltipX}
          y={tooltipY}
          width={foreignObject.width}
          height={foreignObject.height}
          {...tooltipMotion}
        >
          <div
            ref={wrapper}
            style={{
              transform,
              display: 'inline-block',
            }}
          >
            <Tooltip
              hasSpacing={false}
              mode={theme.tooltip.mode}
              arrowDirection={arrowDirection as Position}
              arrowTop={typeof arrowTop === 'number' && `${arrowTop}px`}
            >
              {children}
            </Tooltip>
          </div>
        </motion.foreignObject>
      )}
    </AnimatePresence>
  );
};

export default ChartTooltip;
