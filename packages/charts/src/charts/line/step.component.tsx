import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { StepType, Mark } from './types';

import { findMarksInCluster } from './line-chart.utils';

const pointMotion = {
  initial: 'hidden',
  animate: 'show',
  variants: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  transition: { delay: 0.1, duration: 0.3 },
};

type Props = {
  steps: StepType[];
  marks: Record<number, Mark[]>;
  onMouseEnter: (e: React.MouseEvent, mark: StepType) => void;
  onMouseMove: (e: React.MouseEvent, mark: StepType) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
};

const Step = ({
  steps,
  marks,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}: Props) => {
  const [activeStep, setActiveStep] = useState(null);
  const filteredMarks =
    activeStep && findMarksInCluster(activeStep, marks, activeStep.height);
  return (
    <>
      {filteredMarks &&
        filteredMarks.map((mark: Mark) => {
          const { key, color, radius, x, y } = mark;
          return (
            <g key={key}>
              <motion.circle
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                {...pointMotion}
              />
            </g>
          );
        })}
      {steps &&
        steps.map((item: StepType) => {
          const transformedItem = {
            ...item,
            x: item.x + item.width / 2,
          };
          const { key, middle: x, y, width, height } = transformedItem;
          return (
            <g
              key={key}
              onMouseEnter={e => {
                onMouseEnter(e, transformedItem);
                setActiveStep(transformedItem);
              }}
              onMouseMove={e => {
                onMouseMove(e, transformedItem);
              }}
              onMouseLeave={e => {
                onMouseLeave(e);
                setActiveStep(null);
              }}
            >
              <rect
                x={x}
                y={y}
                height={height}
                width={width}
                fill="transparent"
                {...pointMotion}
              />
            </g>
          );
        })}
    </>
  );
};

export default Step;
