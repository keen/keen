import React, { useState, useMemo, useRef, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Marks from './marks.component';
import Step from './step.component';
import {
  groupMarksByPosition,
  findMarksInCluster,
  showAllMarks,
} from './line-chart.utils';

import { HoverBar, hoverBarMotion } from '../../components';

import { ChartContext, ChartContextType } from '../../contexts';

import { DataSelector, GroupMode, StackMode } from '../../types';

import { Mark, Line, CurveType, StepType, AreaType } from './types';

import GradientFilter from './gradient-filter.component';

const HOVER_BAR_HIDE_TIME = 300;

const createLineMotion = (color: string) => ({
  hidden: {
    pathLength: 0,
    stroke: 'rgba(0, 0, 0, 0)',
  },
  visible: {
    pathLength: 1,
    stroke: color,
  },
});

const createAreaMotion = () => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
});

const lineTransition = { delay: 0.5, duration: 0.8 };

const areaTransition = { delay: 0.7, duration: 0.8 };

type Props = {
  lines: Line[];
  marks: Mark[];
  steps: StepType[];
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
  stepMode: boolean;
  areas?: AreaType[];
  gradient?: boolean;
  onMarkMouseEnter: (
    e: React.MouseEvent,
    selectors: { selector: DataSelector; color: string }[]
  ) => void;
  onMarkMouseLeave: (e: React.MouseEvent) => void;
};

const Lines = ({
  lines,
  marks,
  steps,
  areas,
  curve,
  stackMode,
  groupMode,
  stepMode,
  gradient,
  onMarkMouseEnter,
  onMarkMouseLeave,
}: Props) => {
  const hideHoverBar = useRef(null);
  const [hoverBarState, setHoverBar] = useState<{
    visible: boolean;
    x: number;
  }>({
    visible: false,
    x: 0,
  });

  const {
    theme: { hoverBar },
  } = useContext(ChartContext) as ChartContextType;

  const groupedMarks = useMemo(() => groupMarksByPosition(marks), [marks]);
  const allMarks = showAllMarks(stepMode, marks, lines);

  return (
    <>
      {lines.map(({ key, d, color, strokeWidth }: Line, idx) => (
        <g key={key}>
          <motion.path
            key={`${key}-${curve}-${stackMode}-${groupMode}`}
            d={d}
            variants={createLineMotion(color)}
            transition={lineTransition}
            initial="hidden"
            animate="visible"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {areas.length && (
            <>
              {gradient && (
                <GradientFilter
                  filterId={`id-${color}`}
                  color={color}
                  firstOpacity={areas[idx].firstOpacity}
                  lastOpacity={areas[idx].lastOpacity}
                />
              )}
              <motion.path
                key={`${key}-${curve}-${stackMode}-${groupMode}`}
                d={areas[idx].d}
                fill={gradient ? `url(#id-${color})` : color}
                variants={createAreaMotion()}
                transition={areaTransition}
                initial="hidden"
                animate="visible"
              />
            </>
          )}
        </g>
      ))}
      <AnimatePresence>
        {hoverBar.enabled && hoverBarState.visible && (
          <motion.g {...hoverBarMotion}>
            <HoverBar
              onMouseEnter={() =>
                hideHoverBar.current && clearTimeout(hideHoverBar.current)
              }
              onMouseLeave={() => {
                hideHoverBar.current = setTimeout(() => {
                  setHoverBar({
                    visible: false,
                    x: 0,
                  });
                }, HOVER_BAR_HIDE_TIME);
              }}
              x={hoverBarState.x}
            />
          </motion.g>
        )}
      </AnimatePresence>
      <Step
        steps={steps}
        marks={groupedMarks}
        onMouseEnter={(e, mark) => {
          if (hideHoverBar.current) clearTimeout(hideHoverBar.current);
          allMarks &&
            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks, mark.height)
            );
          setHoverBar({ x: mark.middle + mark.width / 2, visible: true });
        }}
        onMouseMove={(e, mark) => {
          if (hideHoverBar.current) clearTimeout(hideHoverBar.current);
          allMarks &&
            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks, mark.height)
            );
          setHoverBar({ x: mark.middle + mark.width / 2, visible: true });
        }}
        onMouseLeave={e => {
          onMarkMouseLeave(e);
          hideHoverBar.current = setTimeout(() => {
            setHoverBar({
              visible: false,
              x: 0,
            });
          }, HOVER_BAR_HIDE_TIME);
        }}
      />
      {!allMarks && (
        <Marks
          marks={marks}
          curve={curve}
          groupMode={groupMode}
          stackMode={stackMode}
          steps={steps}
          onMouseEnter={(e, mark) => {
            if (hideHoverBar.current) clearTimeout(hideHoverBar.current);
            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks).map(
                ({ selector, color }) => ({
                  selector,
                  color,
                })
              )
            );
            setHoverBar({ x: mark.x, visible: true });
          }}
          onMouseLeave={e => {
            onMarkMouseLeave(e);
            hideHoverBar.current = setTimeout(() => {
              setHoverBar({
                visible: false,
                x: 0,
              });
            }, HOVER_BAR_HIDE_TIME);
          }}
        />
      )}
    </>
  );
};

export default Lines;
