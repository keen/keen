import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import { TooltipPosition } from './types';

import { calculatePercentage, calculateValueStep } from './slider.utils';

import { Tooltip } from './slider.styles';

type Props = {
  isHorizontal: boolean;
  sliderSize: number;
  min: number;
  max: number;
  initialPos: number;
  dragConstraints: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  steps: number;
  onDrag?: (res: { pos: number; val: number }) => void;
  zIdx?: boolean;
  size?: number;
  background?: string;
  border?: string;
  tooltip?: {
    enabled?: boolean;
    position?: TooltipPosition;
  };
};

const Control = ({
  isHorizontal,
  min,
  max,
  initialPos,
  steps,
  sliderSize,
  onDrag,
  zIdx,
  dragConstraints,
  size = 12,
  background = '#fff',
  border = '2px solid #CA8917',
  tooltip: { enabled: tooltipEnabled, position: tooltipPosition },
}: Props) => {
  const stepSliderSize = steps ? sliderSize / steps : 1;
  const stepValueSize = steps ? (max - min) / steps : 1;
  const position = useMotionValue(initialPos);
  const [state, setState] = useState({
    value: 0,
    tooltipVisibility: false,
  });

  useEffect(() => {
    position.set(initialPos);
    setState({
      ...state,
      value: sliderSize
        ? calculatePercentage(initialPos, sliderSize, max, min, stepValueSize) +
          min
        : min,
    });
  }, [initialPos, isHorizontal, min, max, steps]);

  const { value, tooltipVisibility } = state;
  const layoutStyle = isHorizontal ? { x: position } : { y: position };

  return (
    <>
      <motion.div
        drag={isHorizontal ? 'x' : 'y'}
        dragConstraints={dragConstraints}
        style={{
          position: 'absolute',
          top: -6,
          width: size,
          height: size,
          borderRadius: '50%',
          background,
          border,
          zIndex: zIdx && 1,
          left: -6,
          ...layoutStyle,
        }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(e, info) => {
          const pos = isHorizontal ? info.point.x : info.point.y;
          position.set(calculateValueStep(pos, stepSliderSize));
          setState({
            ...state,
            tooltipVisibility: true,
            value:
              calculatePercentage(pos, sliderSize, max, min, stepValueSize) +
              min,
          });
          onDrag({
            pos: calculateValueStep(pos, stepSliderSize),
            val: value,
          });
        }}
        onMouseEnter={() => {
          setState({ ...state, tooltipVisibility: true });
        }}
        onMouseLeave={() => {
          setState({ ...state, tooltipVisibility: false });
        }}
        onDragEnd={() => {
          setState({ ...state, tooltipVisibility: false });
        }}
      >
        {tooltipEnabled && tooltipVisibility && (
          <Tooltip type={tooltipPosition} size={size}>
            {value}
          </Tooltip>
        )}
      </motion.div>
    </>
  );
};

export default Control;
