import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';

import GridLine from './grid-line.component';
import { generateGridLines, AxisType } from './cartesian-grid.utils';

import { ChartContext, ChartContextType } from '../contexts';

type Props = {
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
};

export const CartesianGrid = ({ xScale, yScale }: Props) => {
  const {
    svgDimensions,
    margins,
    theme: { gridX, gridY },
  } = useContext(ChartContext) as ChartContextType;

  const xLines =
    gridX.enabled &&
    generateGridLines({
      axisType: AxisType.X,
      scale: xScale,
      dimension: svgDimensions,
      margins,
    });

  const yLines =
    gridY.enabled &&
    generateGridLines({
      axisType: AxisType.Y,
      scale: yScale,
      dimension: svgDimensions,
      margins,
    });

  return (
    <>
      {gridX.enabled &&
        xLines.map((line, idx) => (
          <GridLine key={idx} color={gridX.color} {...line} />
        ))}
      {gridY.enabled &&
        yLines.map((line, idx) => (
          <GridLine key={idx} color={gridY.color} {...line} />
        ))}
    </>
  );
};

export default CartesianGrid;
