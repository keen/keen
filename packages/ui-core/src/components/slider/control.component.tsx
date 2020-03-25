import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import { Position } from '../../types';
import ContainerTooltip from './control-tooltip.component';
import Tooltip from '../tooltip';

import {
  calculatePercentage,
  calculateValueStep,
  arrowReverse,
} from './slider.utils';

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
  sliderThickness: number;
  onDrag?: (res: { pos: number; val: number }) => void;
  zIdx?: boolean;
  size?: number;
  background?: string;
  border?: string;
  tooltip?: {
    enabled?: boolean;
    position?: Position;
  };
};

const Control = ({
  isHorizontal,
  min,
  max,
  initialPos,
  steps,
  sliderThickness,
  sliderSize,
  onDrag,
  zIdx,
  dragConstraints,
  size = 16,
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
  const layoutStyle = isHorizontal
    ? { x: position, top: -size / 2 + sliderThickness / 2, left: -size / 2 + 2 }
    : {
        y: position,
        left: -size / 2 + sliderThickness / 2,
        top: -size / 2 + 2,
      };

  return (
    <>
      <motion.div
        drag={isHorizontal ? 'x' : 'y'}
        dragConstraints={dragConstraints}
        style={{
          position: 'absolute',
          boxSizing: 'border-box',
          width: size,
          height: size,
          borderRadius: '50%',
          background,
          border,
          zIndex: zIdx && 1,
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
          <ContainerTooltip tooltipPosition={tooltipPosition} size={size}>
            <Tooltip arrowDirection={arrowReverse(tooltipPosition)} mode="dark">
              {value}
            </Tooltip>
          </ContainerTooltip>
        )}
      </motion.div>
    </>
  );
};

export default Control;
