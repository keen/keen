import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

import Marks from '../marks';
import Step from '../steps/';
import {
  groupMarksByPosition,
  findMarksInCluster,
  showAllMarks,
} from '../../utils';

import { HoverBar, hoverBarMotion } from '../../../../components';

import { ChartContext, ChartContextType } from '../../../../contexts';

import { AnimationVariants } from './types';
import { DataSelector, GroupMode, StackMode } from '../../../../types';
import {
  Mark,
  Line,
  CurveType,
  StepType,
  AreaType,
  GradientBlockType,
} from '../../types';

import GradientFilter from '../gradient-filter';
import ClipPath from '../clip-path';

const HOVER_BAR_HIDE_TIME = 300;

const createLineMotion = (color: string, isActive: boolean) => ({
  [AnimationVariants.Hidden]: {
    pathLength: 0,
    stroke: 'rgba(0, 0, 0, 0)',
    opacity: 1,
    transition: { duration: 0, delay: 0 },
  },
  [AnimationVariants.Visible]: {
    pathLength: 1,
    stroke: color,
    opacity: 1,
    transition: { duration: 0.3, delay: 0.2 },
  },
  [AnimationVariants.Active]: {
    pathLength: 1,
    stroke: color,
    opacity: isActive ? 1 : 0.2,
    transition: isActive ? { delay: 0.2, duration: 0.3 } : { duration: 0.3 },
  },
  [AnimationVariants.OffsetChange]: {
    pathLength: 1,
    stroke: color,
    opacity: 1,
    transition: { delay: 0, duration: 0.5 },
  },
});

const createAreaMotion = {
  [AnimationVariants.Hidden]: {
    opacity: 0,
    transition: { duration: 0, delay: 0 },
  },
  [AnimationVariants.Visible]: {
    opacity: 1,
    transition: { delay: 0.7, duration: 0.8 },
  },
  [AnimationVariants.OffsetChange]: {
    opacity: 1,
    transition: { delay: 0, duration: 0.5 },
  },
};

type Props = {
  lines: Line[];
  marks: Mark[];
  steps: StepType[];
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
  areaMode: boolean;
  stepMode: boolean;
  areas?: AreaType[];
  colorPalette: string[];
  gradientBlocks?: GradientBlockType[];
  gradient?: boolean;
  activeKey?: string;
  onMarkMouseEnter: (
    e: React.MouseEvent,
    selectors: { selector: DataSelector; color: string }[]
  ) => void;
  onMarkMouseLeave: (e: React.MouseEvent) => void;
  dataSeriesOffset?: [number, number];
};

const Lines = ({
  lines,
  marks,
  steps,
  areas,
  colorPalette,
  curve,
  activeKey,
  stackMode,
  areaMode,
  groupMode,
  stepMode,
  gradient,
  gradientBlocks,
  onMarkMouseEnter,
  onMarkMouseLeave,
  dataSeriesOffset,
}: Props) => {
  const [initialDrawFinished, setInitialDraw] = useState(false);
  const lineControls = useAnimation();
  const areaControls = useAnimation();

  const hideHoverBar = useRef(null);
  const [hoverBarState, setHoverBar] = useState<{
    visible: boolean;
    x: number;
  }>({
    visible: false,
    x: 0,
  });

  const {
    svgDimensions: { height },
    theme: { hoverBar },
  } = useContext(ChartContext) as ChartContextType;

  useEffect(() => {
    if (initialDrawFinished) {
      setInitialDraw(false);
    }

    lineControls
      .start(AnimationVariants.Visible, { delay: 0.5, duration: 0.8 })
      .then(() => {
        setInitialDraw(true);
      });
    if (areaMode) {
      areaControls.start(AnimationVariants.Visible, {
        delay: 0.5,
        duration: 0.8,
      });
    }
  }, [
    curve,
    groupMode,
    stackMode,
    stepMode,
    lines.length,
    colorPalette,
    areaMode,
  ]);

  useEffect(() => {
    if (activeKey) {
      lineControls.start(AnimationVariants.Active).then(() => {
        setInitialDraw(true);
      });
    } else if (initialDrawFinished) {
      lineControls.start(AnimationVariants.Visible, {
        delay: 0.4,
        duration: 0.3,
      });
    }
  }, [activeKey]);

  useEffect(() => {
    if (initialDrawFinished) {
      lineControls.start(AnimationVariants.OffsetChange);
      if (areaMode) {
        areaControls.start(AnimationVariants.OffsetChange);
      }
    }
  }, [dataSeriesOffset, areaMode]);

  const groupedMarks = useMemo(() => groupMarksByPosition(marks), [marks]);
  const allMarks = showAllMarks(stepMode, marks, lines);

  return (
    <>
      {lines.map(({ key, d, color, strokeWidth }: Line, idx) => (
        <g key={key}>
          <motion.path
            key={`${key}-${curve}-${stackMode}-${groupMode}-${
              areaMode ? 'area' : 'line'
            }`}
            d={d}
            variants={createLineMotion(color, key === activeKey)}
            animate={lineControls}
            stroke={color}
            strokeWidth={strokeWidth}
            initial={AnimationVariants.Hidden}
            fill="transparent"
          />
          {areas.length && gradientBlocks.length && (
            <>
              {gradient && (
                <GradientFilter
                  filterId={`gradient-${areas[idx].id}`}
                  positiveColor={areas[idx].positiveColor}
                  zeroPointColor={areas[idx].zeroPointColor}
                  negativeColor={areas[idx].negativeColor}
                  gradientZeroPercent={areas[idx].gradientZeroPercent}
                />
              )}
              <ClipPath id={`clip-${areas[idx].id}`} area={areas[idx].d} />
              <motion.rect
                x={gradientBlocks[idx].x}
                y={gradientBlocks[idx].y}
                width={gradientBlocks[idx].width}
                height={gradientBlocks[idx].height}
                fill={gradient ? `url(#gradient-${areas[idx].id})` : color}
                clipPath={`url(#clip-${areas[idx].id})`}
                key={`${key}-${curve}-${stackMode}-${groupMode}-${color}-area-gradient`}
                variants={createAreaMotion}
                initial={AnimationVariants.Hidden}
                animate={areaControls}
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
      {allMarks ? (
        <Step
          steps={steps}
          marks={groupedMarks}
          onMouseEnter={(e, mark) => {
            if (hideHoverBar.current) clearTimeout(hideHoverBar.current);

            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks, mark.height)
            );
            setHoverBar({ x: mark.middle + mark.width / 2, visible: true });
          }}
          onMouseMove={(e, mark) => {
            if (hideHoverBar.current) clearTimeout(hideHoverBar.current);
            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks, mark.height)
            );
            setHoverBar({ x: mark.middle + mark.width / 2, visible: true });
          }}
          onMouseLeave={(e) => {
            onMarkMouseLeave(e);
            hideHoverBar.current = setTimeout(() => {
              setHoverBar({
                visible: false,
                x: 0,
              });
            }, HOVER_BAR_HIDE_TIME);
          }}
        />
      ) : (
        <Marks
          marks={marks}
          curve={curve}
          colorPalette={colorPalette}
          groupMode={groupMode}
          stackMode={stackMode}
          steps={steps}
          activeKey={activeKey}
          onMouseEnter={(e, mark) => {
            if (hideHoverBar.current) clearTimeout(hideHoverBar.current);
            let marksRange;
            if (groupMode === 'stacked') marksRange = height;
            onMarkMouseEnter(
              e,
              findMarksInCluster(mark, groupedMarks, marksRange).map(
                ({ selector, color }) => ({
                  selector,
                  color,
                })
              )
            );
            setHoverBar({ x: mark.x, visible: true });
          }}
          onMouseLeave={(e) => {
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
