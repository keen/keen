import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { Line } from './elements';
import { generateGridLines, AxisType } from './grid.utils';

import { ChartContext, ChartContextType } from '../contexts';

type Props = {
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
};

export const Grid = ({ xScale, yScale }: Props) => {
  const {
    svgDimensions,
    xScaleSettings,
    margins,
    theme: { gridX, gridY },
  } = useContext(ChartContext) as ChartContextType;

  const xLines =
    gridX.enabled &&
    generateGridLines({
      axisType: AxisType.X,
      scale: xScale,
      scaleSettings: xScaleSettings,
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
          <Line key={idx} color={gridX.color} {...line} />
        ))}
      {gridY.enabled &&
        yLines.map((line, idx) => (
          <Line key={idx} color={gridY.color} {...line} />
        ))}
    </>
  );
};

export default Grid;
