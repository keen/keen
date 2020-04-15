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
  let width = BAR_WIDTH;
  let barX = x - BAR_WIDTH / 2;

  if (xMax === x || xMin === x) width = BAR_WIDTH / 2;
  if (xMin === x) barX = xMin;

  const rightEdge = x + BAR_WIDTH / 2;
  const leftEdge = barX - xMin;

  if (rightEdge > xMax) width = BAR_WIDTH - (rightEdge - xMax);
  if (leftEdge < 0) {
    width = BAR_WIDTH + leftEdge;
    barX = barX - leftEdge;
  }

  const barY = y || margins.top;

  return {
    height,
    width,
    barX,
    barY,
  };
};
