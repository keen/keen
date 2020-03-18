import React, { FC, useState, useRef, useEffect } from 'react';
import { Frame } from 'framer';

import OffRange from './off-range.component';
import Control from './control.component';

import { Controls, OffRangeType } from './types';

import { colorsString, onChangeValue } from './slider.utils';

type Props = {
  min?: number;
  max?: number;
  colors: string[];
  steps?: number;
  colorSteps?: number;
  controls?: Controls;
  onChange?: (res: { min: number; max: number } | number) => void;
  offRange?: OffRangeType;
};

export const Slider: FC<Props> = ({
  min = 0,
  max = 100,
  controls = { number: 1 },
  steps = 0,
  colors,
  colorSteps = 2,
  onChange,
  offRange,
}) => {
  const slider = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    posMin: 0,
    posMax: null,
    valMin: min,
    valMax: max,
    sliderWidth: 0,
  });

  useEffect(() => {
    const refWidth = slider.current.clientWidth;
    setState({
      ...state,
      sliderWidth: refWidth,
    });
  }, [slider.current]);

  const { posMin, posMax, valMin, valMax, sliderWidth } = state;

  return (
    <>
      <Frame
        ref={slider}
        width={'97%'}
        name={'Rail'}
        height={4}
        radius={3}
        background={`linear-gradient(90deg, ${colorsString(
          colors,
          colorSteps
        )}`}
      >
        {controls.number === 2 && (
          <OffRange left={0} width={posMin} {...offRange} />
        )}
        <Control
          sliderWidth={sliderWidth}
          min={min}
          max={max}
          x={0}
          steps={steps}
          zIdx={posMin === max}
          dragConstraintsLeft={0}
          dragConstraintsRight={posMax ? posMax : sliderWidth}
          onDrag={({ pos, val }) => {
            setState({ ...state, posMin: pos, valMin: val });
            onChange &&
              onChange(onChangeValue(controls.number, valMin, valMax));
          }}
          {...controls}
        />
        {controls.number === 2 && (
          <>
            <OffRange
              left={posMax}
              width={posMax && sliderWidth - posMax}
              {...offRange}
            />
            <Control
              sliderWidth={sliderWidth}
              min={min}
              max={max}
              x={sliderWidth}
              steps={steps}
              dragConstraintsLeft={posMin}
              dragConstraintsRight={sliderWidth}
              onDrag={({ pos, val }) => {
                setState({ ...state, posMax: pos, valMax: val });
                onChange &&
                  onChange(onChangeValue(controls.number, valMin, valMax));
              }}
              {...controls}
            />
          </>
        )}
      </Frame>
    </>
  );
};

export default Slider;
