import React, { FC, useRef, useCallback, useReducer, useEffect } from 'react';

import Rail from './rail';
import Mark from './mark';
import OffRange from './off-range';
import Control from './control';

import { sliderActions } from './slider.actions';
import { sliderReducer, initialState } from './slider.reducer';

import { sliderControlSettings } from './slider.settings';

import { ControlSettings, RailSettings } from './types';
import { Layout } from '../../types';

const initialDragControlsState = {
  minimum: {
    active: false,
    moving: false,
    position: 0,
  },
  maximum: {
    active: false,
    moving: false,
    position: 0,
  },
};

type Props = {
  /** Minimum range value */
  minimum: number;
  /** Maximum range value */
  maximum: number;
  /** Colors applied to rail container  */
  colors: string[];
  /** Change range event handler  */
  onChange?: (minimum: number, maximum: number) => void;
  /** Slider layout  */
  layout?: Layout;
  /** Drag controls settings  */
  controlSettings?: ControlSettings;
  /** Rail settings  */
  railSettings?: RailSettings;
  /** Number of colors steps */
  colorSteps?: number;
};

export const RangeSlider: FC<Props> = ({
  layout = 'horizontal',
  controlSettings = sliderControlSettings,
  colors,
  onChange,
  colorSteps = 2,
  railSettings = { size: 4, borderRadius: 3 },
  minimum,
  maximum,
}) => {
  const slider = useRef(null);
  const isHorizontal = layout === 'horizontal';
  const dragDirection = isHorizontal ? 'x' : 'y';

  const [{ value, dimension, dragControls }, dispatch] = useReducer(
    sliderReducer,
    {
      ...initialState,
      dragControls: initialDragControlsState,
      value: [minimum, maximum],
    }
  );

  const calculateControlValue = useCallback(
    (position: number) => {
      const percent = (position / dimension) * 100;
      return Math.round((maximum - minimum) * (percent / 100));
    },
    [dimension, minimum, maximum]
  );

  useEffect(() => {
    const { width, height } = slider.current.getBoundingClientRect();
    const sliderDimension = isHorizontal ? width : height;
    dispatch(sliderActions.setControlPosition('maximum', sliderDimension));
    dispatch(sliderActions.setDimension(sliderDimension));
  }, [slider.current]);

  const layoutStyle = isHorizontal
    ? {
        width: '100%',
        height: `${controlSettings.size}px`,
      }
    : {
        width: `${controlSettings.size}px`,
        height: '100%',
      };

  return (
    <div ref={slider} style={{ position: 'relative', ...layoutStyle }}>
      <Rail
        type={layout}
        size={railSettings.size}
        borderRadius={railSettings.borderRadius}
        colors={colors}
        colorSteps={colorSteps}
      />
      {dimension && (
        <>
          <OffRange
            borderRadius={railSettings.borderRadius}
            styles={
              isHorizontal
                ? {
                    width: `${dragControls.minimum.position}px`,
                    height: `${railSettings.size}px`,
                    left: 0,
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%)`,
                  }
                : {
                    width: `${railSettings.size}px`,
                    height: `${dragControls.minimum.position}px`,
                    top: 0,
                    position: 'absolute',
                    left: '50%',
                    transform: `translateX(-50%)`,
                  }
            }
          />
          <OffRange
            borderRadius={railSettings.borderRadius}
            styles={
              isHorizontal
                ? {
                    width: `calc(100% - ${dragControls.maximum.position}px)`,
                    height: `${railSettings.size}px`,
                    left: `${dragControls.maximum.position}px`,
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%)`,
                  }
                : {
                    width: `${railSettings.size}px`,
                    height: `calc(100% - ${dragControls.maximum.position}px)`,
                    top: `${dragControls.maximum.position}px`,
                    position: 'absolute',
                    left: '50%',
                    transform: `translateX(-50%)`,
                  }
            }
          />
          <Control
            onDrag={(_event, dragInfo) => {
              const {
                point: { x, y },
              } = dragInfo;
              const position = isHorizontal ? x : y;

              const minimumValue = calculateControlValue(position);
              const [, maximumValue] = value;

              dispatch(sliderActions.setValue([minimumValue, maximumValue]));
              dispatch(sliderActions.setControlPosition('minimum', position));

              onChange && onChange(minimumValue, maximumValue);
            }}
            dragDirection={dragDirection}
            dragConstraints={
              isHorizontal
                ? {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: dragControls.maximum.position,
                  }
                : {
                    top: 0,
                    bottom: dragControls.maximum.position,
                    left: 0,
                    right: 0,
                  }
            }
          >
            <Mark {...controlSettings} />
          </Control>
          <Control
            onDrag={(_event, dragInfo) => {
              const {
                point: { x, y },
              } = dragInfo;
              const position = isHorizontal ? x : y;
              const maximumValue = calculateControlValue(position);

              const [minimumValue] = value;

              dispatch(sliderActions.setValue([minimumValue, maximumValue]));
              dispatch(sliderActions.setControlPosition('maximum', position));

              onChange && onChange(minimumValue, maximumValue);
            }}
            dragDirection={dragDirection}
            dragConstraints={
              isHorizontal
                ? {
                    top: 0,
                    bottom: 0,
                    left: dragControls.minimum.position,
                    right: dimension,
                  }
                : {
                    top: dragControls.minimum.position,
                    bottom: dimension,
                    left: 0,
                    right: 0,
                  }
            }
            controlStyles={{ [isHorizontal ? 'x' : 'y']: dimension }}
          >
            <Mark {...controlSettings} />
          </Control>
        </>
      )}
    </div>
  );
};

export default RangeSlider;
