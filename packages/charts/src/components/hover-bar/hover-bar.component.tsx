import React, { FC, useMemo, useContext } from 'react';
import { colors } from '@keen.io/colors';

import { Bar } from './hover-bar.styles';
import { calculateBarProperties } from './hover-bar.utils';

import { ChartContext, ChartContextType } from '../../contexts';

export const hoverBarMotion = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

type Props = {
  x: number;
  y?: number;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
};

const GRADIENT_ID = 'HOVER_BAR_MASK';

const HoverBar: FC<Props> = ({ x, y, onMouseEnter, onMouseLeave }) => {
  const { svgDimensions, margins } = useContext(
    ChartContext
  ) as ChartContextType;

  const { xMin, xMax } = useMemo(() => {
    return {
      xMin: margins.left,
      xMax: svgDimensions.width - margins.right,
    };
  }, [margins.left, margins.right, svgDimensions.width]);

  const { width, height, barX, barY } = calculateBarProperties({
    x,
    y,
    xMin,
    xMax,
    svgDimensions,
    margins,
  });

  return (
    <>
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          x1="100%"
          x2="0%"
          y1="67.625%"
          y2="67.625%"
        >
          <stop offset="0%" stopColor={colors.gray['200']} />
          <stop offset="47.54%" stopColor="#FEFEFE" stopOpacity=".572" />
          <stop offset="100%" stopColor={colors.gray['200']} />
        </linearGradient>
      </defs>
      <Bar
        fill={`url(#${GRADIENT_ID})`}
        fillRule="evenodd"
        opacity=".65"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        x={barX}
        y={barY}
        width={width}
        height={height}
      />
    </>
  );
};

export default HoverBar;
