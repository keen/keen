import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import { Mark, CurveType, StepType } from '../../types';

import { Mark as PointMark, markMotion } from '../../../../components';

import { AnimationVariants } from './types';
import { GroupMode, StackMode } from '../../../../types';

const createPointMotion = (isActive: boolean) => ({
  [AnimationVariants.Hidden]: { opacity: 0 },
  [AnimationVariants.Visible]: { opacity: 1 },
  [AnimationVariants.Active]: {
    opacity: isActive ? 1 : 0.2,
    transition: isActive ? { delay: 0.2, duration: 0.3 } : { duration: 0.3 },
  },
});

const pointTransition = { duration: 0.3, delay: 0.2 };

type Props = {
  marks: Mark[];
  colorPalette: string[];
  steps: StepType[];
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
  activeKey?: string;
  onMouseEnter?: (e: React.MouseEvent, mark: Mark) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Marks = ({
  marks,
  onMouseEnter,
  onMouseLeave,
  curve,
  colorPalette,
  stackMode,
  groupMode,
  activeKey,
}: Props) => {
  const [initialDrawFinished, setInitialDraw] = useState(false);
  const marksControls = useAnimation();

  const [activeMark, setActiveMark] = useState(null);

  useEffect(() => {
    if (initialDrawFinished) {
      setInitialDraw(false);
    }

    marksControls
      .start(AnimationVariants.Visible, { delay: 1.2, duration: 0.3 })
      .then(() => {
        setInitialDraw(true);
      });
  }, [marks.length, colorPalette, curve, groupMode, stackMode]);

  useEffect(() => {
    if (activeKey) {
      marksControls.start(AnimationVariants.Active).then(() => {
        setInitialDraw(true);
      });
    } else if (initialDrawFinished) {
      marksControls.start(AnimationVariants.Visible, {
        delay: 0.4,
        duration: 0.3,
      });
    }
  }, [activeKey]);

  return (
    <>
      {marks.map((mark: Mark) => {
        const { key, dataSerieKey, color, radius, x, y } = mark;
        return (
          <g
            key={key}
            onMouseEnter={(e) => {
              onMouseEnter(e, mark);
              setActiveMark(key);
            }}
            onMouseLeave={(e) => {
              onMouseLeave(e);
              setActiveMark(null);
            }}
          >
            <motion.circle
              key={`${key}-${curve}-${stackMode}-${groupMode}`}
              cx={x}
              cy={y}
              r={radius}
              fill={color}
              initial={AnimationVariants.Hidden}
              animate={marksControls}
              variants={createPointMotion(activeKey === dataSerieKey)}
              transition={pointTransition}
            />
            <AnimatePresence>
              {activeMark === key && (
                <motion.g {...markMotion}>
                  <PointMark x={x} y={y} color={color} />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        );
      })}
    </>
  );
};

export default Marks;
