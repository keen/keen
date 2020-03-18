import React, { useState, useEffect } from 'react';
import { Frame, useMotionValue } from 'framer';

import { calculatePercentage, calculateValueStep } from './slider.utils';

import { Tooltip } from './slider.styles';

type Props = {
  sliderWidth: number;
  min: number;
  max: number;
  x: number;
  dragConstraintsLeft: number;
  dragConstraintsRight: number;
  steps: number;
  onDrag?: (res: { pos: number; val: number }) => void;
  zIdx?: boolean;
  size?: number;
  background?: string;
  border?: string;
};

const Control = ({
  dragConstraintsLeft,
  dragConstraintsRight,
  min,
  max,
  x,
  steps,
  sliderWidth,
  onDrag,
  zIdx,
  size = 12,
  background = '#fff',
  border = '2px solid #CA8917',
}: Props) => {
  const stepSliderSize = steps ? sliderWidth / steps : 1;
  const stepValueSize = steps ? max / steps : 1;
  const position = useMotionValue(x);
  const [state, setState] = useState({
    value: 0,
    tooltip: false,
  });

  useEffect(() => {
    position.set(x);
    x > 0 && setState({ ...state, value: max });
  }, [x]);

  const { value, tooltip } = state;

  return (
    <>
      <Frame
        name={'Control'}
        size={size}
        center={'y'}
        radius={'50%'}
        background={background}
        border={border}
        x={position}
        left={-6}
        drag={'x'}
        dragConstraints={{
          left: dragConstraintsLeft,
          right: dragConstraintsRight,
        }}
        dragElastic={0}
        dragMomentum={false}
        style={{ zIndex: zIdx && 1 }}
        onDrag={(e, info) => {
          const x = info.point.x;
          position.set(calculateValueStep(position.get(), stepSliderSize));
          setState({
            ...state,
            value:
              calculatePercentage(x, sliderWidth, max, min, stepValueSize) +
              min,
          });
          onDrag({
            pos: calculateValueStep(x, stepSliderSize),
            val: value,
          });
        }}
        onMouseEnter={() => {
          setState({ ...state, tooltip: true });
        }}
        onMouseLeave={() => {
          setState({ ...state, tooltip: false });
        }}
      />
      {tooltip && <Tooltip left={position.get()}>{value}</Tooltip>}
    </>
  );
};

export default Control;
