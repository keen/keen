import React, { FC, useState, useRef, useEffect } from 'react';

import OffRange from './off-range.component';
import Control from './control.component';
import Ruler from './ruler.component';

import { Layout, Position, RangeType } from '../../types';

import { Controls, OffRangeType } from './types';

import { colorsString, onChangeValue, calculateTicks } from './slider.utils';

type Props = {
  min?: number;
  max?: number;
  size?: number;
  colors: string[];
  steps?: number;
  colorSteps?: number;
  controls?: Controls;
  onChange?: (res: RangeType | number) => void;
  offRange?: OffRangeType;
  layout?: Layout;
  tooltip?: {
    enabled?: boolean;
    position?: Position;
  };
  ruler?: {
    enabled?: boolean;
    labelSize?: number;
  };
};

export const Slider: FC<Props> = ({
  min = 0,
  max = 100,
  size = 4,
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
  ruler = {
    enabled: true,
    labelSize: 35,
  },
}) => {
  const initialMin = min < max ? min : max;
  const initialMax = min > max ? min : max;

  const slider = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    posMin: 0,
    posMax: null,
    valMin: initialMin,
    valMax: initialMax,
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
      posMin: 0,
      posMax: controls === 2 ? posMax : refSize,
    });
  }, [slider.current, layout, steps]);

  const layoutStyle = isHorizontal
    ? {
        width: '100%',
        height: size,
      }
    : {
        width: size,
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
        {ruler.enabled && (
          <Ruler
            layout={layout}
            controlSize={controls.size}
            ticks={calculateTicks(
              initialMin,
              initialMax,
              steps,
              sliderSize,
              ruler.labelSize
            )}
            sliderThickness={size}
          />
        )}
        {controls.number === 2 && (
          <OffRange
            isHorizontal={isHorizontal}
            left={0}
            size={posMin}
            thickness={size}
            {...offRange}
          />
        )}
        <Control
          isHorizontal={isHorizontal}
          tooltip={tooltip}
          sliderSize={sliderSize}
          min={initialMin}
          max={initialMax}
          initialPos={0}
          steps={steps}
          sliderThickness={size}
          zIdx={posMin === sliderSize}
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
              size={sliderSize - posMax}
              thickness={size}
              {...offRange}
            />
            <Control
              isHorizontal={isHorizontal}
              tooltip={tooltip}
              sliderSize={sliderSize}
              min={initialMin}
              max={initialMax}
              initialPos={sliderSize}
              steps={steps}
              sliderThickness={size}
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
