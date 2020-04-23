import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  useReducer,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Control from './control';
import OffRange from './off-range';
import Rail from './rail';
import Mark from './mark';

import { sliderActions } from './slider.actions';
import { sliderReducer, initialState } from './slider.reducer';

import { sliderControlSettings, tooltipTypography } from './slider.settings';

import TooltipPosition, { tooltipMotion } from './tooltip-position.component';
import { calculateIntervalValue, arrowReverse } from './utils';

import Tooltip from '../tooltip';
import { Text } from '../../typography';

import { DRAG_CONTROL_ID } from './constants';

import {
  ControlSettings,
  TooltipSettings,
  RailSettings,
  Interval,
} from './types';

type Props = {
  /** Collection of intervals */
  intervals: Interval[];
  /** Slider value change handler */
  onChange?: (value: number) => void;
  /** Drag control settings  */
  controlSettings?: ControlSettings;
  /** Tooltip settings  */
  tooltipSettings?: TooltipSettings;
  /** Rail settings  */
  railSettings?: RailSettings;
  /** Colors applied to rail container  */
  colors: string[];
  /** Number of colors steps */
  colorSteps?: number;
};

export const IntervalSlider: FC<Props> = ({
  intervals,
  onChange,
  colors,
  colorSteps = 2,
  tooltipSettings = {
    enabled: true,
    position: 'bottom',
    typography: undefined,
  },
  controlSettings = sliderControlSettings,
  railSettings = { size: 4, borderRadius: 3 },
}) => {
  const slider = useRef(null);
  const [{ value, dimension, dragControls }, dispatch] = useReducer(
    sliderReducer,
    initialState
  );

  const dragControl = dragControls[DRAG_CONTROL_ID];
  const [currentIndex, setIndex] = useState(0);
  const [xOffset, setXOffset] = useState(0);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const { width } = slider.current.getBoundingClientRect();
    dispatch(sliderActions.setDimension(width));
  }, [slider.current]);

  const showTooltip = useCallback(() => {
    if (tooltipSettings.enabled) {
      setTooltip(state => ({
        ...state,
        visible: true,
      }));
    }
  }, [tooltipSettings.enabled]);

  const hideTooltip = useCallback(() => {
    if (tooltipSettings.enabled) {
      setTooltip(state => ({
        ...state,
        visible: false,
      }));
    }
  }, [tooltipSettings.enabled]);

  const stepDimension = dimension / intervals.length;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const offset = e.clientX - e.currentTarget.offsetLeft;
    let x = offset;
    if (offset < 0) x = 0;
    if (offset > dimension) x = dimension;

    let index = Math.floor(x / stepDimension);

    if (x !== 0 && x % stepDimension === 0) {
      index -= 1;
    }

    setIndex(index);

    const value = calculateIntervalValue({
      controlPosition: x,
      interval: intervals[index],
      currentIndex: index,
      stepDimension,
    });
    dispatch(sliderActions.setValue(value));
    dispatch(sliderActions.setControlPosition(DRAG_CONTROL_ID, x));
    setXOffset(x);

    onChange && onChange(value);
    if (tooltipSettings.enabled) {
      setTooltip(state => ({ ...state, visible: true, y: 0, x }));
    }
  };

  return (
    <div
      ref={slider}
      style={{ height: `${controlSettings.size}px`, position: 'relative' }}
      onClick={handleClick}
    >
      <Rail
        type="horizontal"
        size={railSettings.size}
        borderRadius={railSettings.borderRadius}
        colors={colors}
        colorSteps={colorSteps}
      />
      <OffRange
        borderRadius={railSettings.borderRadius}
        styles={{
          width: `calc(100% - ${dragControl.position}px)`,
          height: `${railSettings.size}px`,
          left: `${dragControl.position}px`,
          position: 'absolute',
          top: '50%',
          transform: `translateY(-50%)`,
        }}
      />
      <Control
        x={xOffset}
        onDragStart={() => {
          dispatch(sliderActions.setControlDrag(DRAG_CONTROL_ID, true));
          showTooltip();
        }}
        onDragEnd={() => {
          dispatch(sliderActions.setControlDrag(DRAG_CONTROL_ID, false));
          if (!dragControl.active) hideTooltip();
        }}
        onDrag={(_event, dragInfo) => {
          const {
            point: { x },
          } = dragInfo;
          const nextIndex = currentIndex + 1;

          if (x > nextIndex * stepDimension) {
            setIndex(nextIndex);
          } else if (x < currentIndex * stepDimension) {
            setIndex(currentIndex - 1);
          }

          const value = calculateIntervalValue({
            controlPosition: x,
            interval: intervals[currentIndex],
            currentIndex: currentIndex,
            stepDimension,
          });

          dispatch(sliderActions.setValue(value));
          dispatch(sliderActions.setControlPosition(DRAG_CONTROL_ID, x));

          onChange && onChange(value);
          if (tooltipSettings.enabled) {
            setTooltip(state => ({ ...state, y: 0, x }));
          }
        }}
        dragDirection="x"
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: 0,
          right: dimension,
        }}
      >
        <>
          <Mark
            {...controlSettings}
            onMouseEnter={() => {
              dispatch(sliderActions.setControlState(DRAG_CONTROL_ID, true));
              showTooltip();
            }}
            onMouseLeave={() => {
              dispatch(sliderActions.setControlState(DRAG_CONTROL_ID, false));
              if (!dragControl.moving) hideTooltip();
            }}
          />
          {tooltipSettings.enabled && (
            <TooltipPosition
              x={tooltip.x}
              y={tooltip.y}
              visible={tooltip.visible}
              containerSize={controlSettings.size}
              position={tooltipSettings.position}
            >
              <AnimatePresence>
                {tooltip.visible && (
                  <motion.div {...tooltipMotion}>
                    <Tooltip
                      arrowDirection={arrowReverse(tooltipSettings.position)}
                      mode="dark"
                    >
                      <Text
                        {...(tooltipSettings.typography
                          ? tooltipSettings.typography
                          : tooltipTypography)}
                      >
                        {tooltipSettings.renderText
                          ? tooltipSettings.renderText(value as number)
                          : value}
                      </Text>
                    </Tooltip>
                  </motion.div>
                )}
              </AnimatePresence>
            </TooltipPosition>
          )}
        </>
      </Control>
    </div>
  );
};

export default IntervalSlider;
