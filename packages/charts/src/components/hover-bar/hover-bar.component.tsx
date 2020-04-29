import React, { FC, useMemo, useContext } from 'react';

import Gradient, { GRADIENT_ID } from './gradient.component';
import HoverLine from './hover-line.component';
import { Bar } from './hover-bar.styles';

import { calculateBarProperties } from './hover-bar.utils';

import { ChartContext, ChartContextType } from '../../contexts';

import { HoverBarType } from '../../charts/line/types';
import { colors } from '@keen.io/colors/';

export const hoverBarMotion = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

type Props = {
  x: number;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  y?: number;
  showLine?: boolean;
  type?: HoverBarType;
};

const HoverBar: FC<Props> = ({
  x,
  y,
  showLine = true,
  onMouseEnter,
  onMouseLeave,
  type = 'dark',
}) => {
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

  const color = type === 'dark' ? colors.black[500] : colors.gray[100];

  return (
    <>
      <Gradient color={color} />
      <Bar
        fill={`url(#${GRADIENT_ID})`}
        fillRule="evenodd"
        opacity=".1"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        x={barX}
        y={barY}
        width={width}
        height={height}
      />
      {showLine && <HoverLine x1={x} x2={x} y1={barY} y2={barY + height} />}
    </>
  );
};

export default HoverBar;
