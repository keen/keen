import { Margins, Dimension } from '../../types';

type Options = {
  xMin: number;
  xMax: number;
  x: number;
  y?: number;
  margins: Margins;
  svgDimensions: Dimension;
};

export const BAR_WIDTH = 50;

export const calculateBarProperties = ({
  xMin,
  xMax,
  x,
  y,
  margins,
  svgDimensions,
}: Options) => {
  const height = svgDimensions.height - margins.top - margins.bottom;
  const overflowLeft = xMin > x - BAR_WIDTH / 2;
  const overflowRight = x + BAR_WIDTH / 2 > xMax;

  let barX = x - BAR_WIDTH / 2;

  if (overflowLeft) barX = xMin;
  if (overflowRight) barX = xMax - BAR_WIDTH;

  const barY = y || margins.top;

  return {
    height,
    width: BAR_WIDTH,
    barX,
    barY,
  };
};
