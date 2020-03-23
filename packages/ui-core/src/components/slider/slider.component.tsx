import React, { FC, useState, useRef, useEffect } from 'react';

import OffRange from './off-range.component';
import Control from './control.component';

import { Controls, OffRangeType, Layout, TooltipPosition } from './types';

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
  layout?: Layout;
  tooltip?: {
    enabled?: boolean;
    position?: TooltipPosition;
  };
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
  layout = 'horizontal',
  tooltip = {
    enabled: true,
    position: layout === 'horizontal' ? 'bottom' : 'right',
  },
}) => {
  const slider = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    posMin: 0,
    posMax: null,
    valMin: min,
    valMax: max,
    sliderSize: 0,
  });

  const { posMin, posMax, valMin, valMax, sliderSize } = state;

  const isHorizontal = layout === 'horizontal';

  useEffect(() => {
    const refSize = isHorizontal
      ? slider.current.clientWidth
      : slider.current.clientHeight;
    setState({
      ...state,
      sliderSize: refSize,
      posMax: controls === 2 ? posMax : refSize,
    });
  }, [slider.current, layout]);

  const layoutStyle = isHorizontal
    ? {
        width: '100%',
        height: 4,
      }
    : {
        width: 4,
        height: '100%',
      };

  const gradientAngle = isHorizontal ? 90 : 180;

  return (
    <>
      <div
        ref={slider}
        style={{
          position: 'relative',
          borderRadius: 3,
          background:
            colorSteps > 1
              ? `linear-gradient(${gradientAngle}deg, ${colorsString(
                  colors,
                  colorSteps
                )}`
              : colors[0],
          ...layoutStyle,
        }}
      >
        {controls.number === 2 && (
          <OffRange
            isHorizontal={isHorizontal}
            left={0}
            width={posMin}
            {...offRange}
          />
        )}
        <Control
          isHorizontal={isHorizontal}
          tooltip={tooltip}
          sliderSize={sliderSize}
          min={min}
          max={max}
          initialPos={0}
          steps={steps}
          zIdx={posMin === max}
          dragConstraints={{
            top: 0,
            left: 0,
            right: posMax ? posMax : sliderSize,
            bottom: posMax ? posMax : sliderSize,
          }}
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
              isHorizontal={isHorizontal}
              left={posMax}
              width={posMax && sliderSize - posMax}
              {...offRange}
            />
            <Control
              isHorizontal={isHorizontal}
              tooltip={tooltip}
              sliderSize={sliderSize}
              min={min}
              max={max}
              initialPos={sliderSize}
              steps={steps}
              dragConstraints={{
                top: posMin,
                left: posMin,
                right: sliderSize,
                bottom: sliderSize,
              }}
              onDrag={({ pos, val }) => {
                setState({ ...state, posMax: pos, valMax: val });
                onChange &&
                  onChange(onChangeValue(controls.number, valMin, valMax));
              }}
              {...controls}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Slider;
