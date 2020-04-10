import React, { FC, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Control from './control.component';
import Mark from './mark.component';

import { sliderControlSettings, tooltipTypography } from '../slider.settings';

import Rail from '../rail.component';
import TooltipPosition from '../tooltip-position.component';
import { calculateIntervalValue, arrowReverse } from '../utils';

import Tooltip from '../../tooltip';
import { Text } from '../../../typography';

import { ControlSettings, Interval } from '../types';
import { Position, Typography } from '../../../types';

const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

type Props = {
  intervals: Interval[];
  onChange?: (value: number) => void;
  tooltipSettings?: {
    enabled: boolean;
    position: Position;
    typography?: Typography;
    renderText?: (value: number) => React.ReactNode;
  };
  colors: string[];
  colorSteps?: number;
  controlSettings?: ControlSettings;
  size?: number;
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
  size = 4,
}) => {
  const slider = useRef(null);

  const [dimension, setDimension] = useState(0);
  const [value, setValue] = useState(0);
  const [intervalIndex, setIntervalIndex] = useState(0);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const { width } = slider.current.getBoundingClientRect();
    setDimension(width);
  }, [slider.current]);

  const stepDimension = dimension / intervals.length;

  console.log(tooltipSettings, 'sa');

  return (
    <div
      ref={slider}
      style={{ height: `${controlSettings.size}px`, position: 'relative' }}
    >
      <Rail
        type="horizontal"
        size={size}
        colors={colors}
        colorSteps={colorSteps}
      />
      <Control
        onDragStart={() => {
          if (tooltipSettings.enabled) {
            setTooltip(state => ({ ...state, visible: true }));
          }
        }}
        onDragEnd={() => {
          if (tooltipSettings.enabled) {
            setTooltip(state => ({ ...state, visible: false }));
          }
        }}
        onDrag={(_e, dragInfo) => {
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
          <Mark {...controlSettings} />
          {tooltipSettings.enabled && (
            <TooltipPosition
              x={tooltip.x}
              y={tooltip.y}
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
