import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Control from './control';
import OffRange from './off-range';
import Rail from './rail';
import Mark from './mark';

import { sliderControlSettings, tooltipTypography } from './slider.settings';

import TooltipPosition from './tooltip-position.component';
import { calculateIntervalValue, arrowReverse } from './utils';

import Tooltip from '../tooltip';
import { Text } from '../../typography';

import { ControlSettings, RailSettings, Interval } from './types';
import { Position, Typography } from '../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
};

type Props = {
  /** Collection of intervals */
  intervals: Interval[];
  /** Slider value change handler */
  onChange?: (value: number) => void;
  /** Drag control settings  */
  controlSettings?: ControlSettings;
  /** Tooltip settings  */
  tooltipSettings?: {
    enabled: boolean;
    position: Position;
    typography?: Typography;
    renderText?: (value: number) => React.ReactNode;
  };
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

  const [dimension, setDimension] = useState(0);
  const [value, setValue] = useState(0);
  const [intervalIndex, setIntervalIndex] = useState(0);

  const [drag, setDrag] = useState<{
    active: boolean;
    position: number;
  }>({
    active: false,
    position: 0,
  });
  const [controlActive, setControl] = useState(false);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const { width } = slider.current.getBoundingClientRect();
    setDimension(width);
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

  return (
    <div
      ref={slider}
      style={{ height: `${controlSettings.size}px`, position: 'relative' }}
    >
      <Rail
        type="horizontal"
        size={railSettings.size}
        borderRadius={railSettings.borderRadius}
        colors={colors}
        colorSteps={colorSteps}
      />
      <OffRange
        size={railSettings.size}
        borderRadius={railSettings.borderRadius}
        position={drag.position}
      />
      <Control
        onDragStart={() => {
          setDrag(state => ({
            ...state,
            active: true,
          }));
          showTooltip();
        }}
        onDragEnd={() => {
          setDrag(state => ({
            ...state,
            active: false,
          }));
          if (!controlActive) hideTooltip();
        }}
        onDrag={(_event, dragInfo) => {
          const {
            point: { x },
          } = dragInfo;
          const nextIndex = intervalIndex + 1;

          if (x > nextIndex * stepDimension) {
            setIntervalIndex(nextIndex);
          } else if (x < intervalIndex * stepDimension) {
            setIntervalIndex(intervalIndex - 1);
          }

          const value = calculateIntervalValue({
            controlPosition: x,
            interval: intervals[intervalIndex],
            currentIndex: intervalIndex,
            stepDimension,
          });

          setValue(value);
          setDrag(state => ({
            ...state,
            position: x,
          }));
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
              setControl(true);
              showTooltip();
            }}
            onMouseLeave={() => {
              setControl(false);
              if (!drag.active) hideTooltip();
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
                          ? tooltipSettings.renderText(value)
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
