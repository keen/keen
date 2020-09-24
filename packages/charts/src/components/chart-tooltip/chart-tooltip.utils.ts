import { ARROW_SIZE } from '@keen.io/ui-core';
import { calculateHypotenuseHeight } from '@keen.io/charts-utils';

import { Margins, Dimension } from '../../types';

type Options = {
  x: number;
  y: number;
  width: number;
  height: number;
  margins: Margins;
  svgDimensions: Dimension;
};

export const calculateTooltipPosition = ({
  svgDimensions,
  margins,
  x,
  y,
  width,
  height,
}: Options) => {
  const xMaxPosition = svgDimensions.width - margins.right;
  const yMaxPosition = svgDimensions.height - margins.top;

  const hasXOverflow = x + width >= xMaxPosition;
  const hasYMaxOverflow = y + height / 2 >= yMaxPosition;
  const hasYMinOverflow = y - height / 2 <= 0;

  const arrowHeight = calculateHypotenuseHeight(ARROW_SIZE, ARROW_SIZE);

  let transform = 'translateY(-50%) translateX(20px)';
  let arrowDirection = 'left';
  let tooltipX = x;
  let tooltipY = y;
  let arrowTop;

  if (hasXOverflow) {
    transform = 'translateY(-50%) translateX(-20px)';
    arrowDirection = 'right';
    tooltipX = x - width;
  }

  if (hasYMinOverflow) {
    tooltipY = height / 2;
    arrowTop = y < arrowHeight ? arrowHeight : y;
  }

  if (hasYMaxOverflow) {
    tooltipY = yMaxPosition - height / 2;
    const arrowPosition = height - (yMaxPosition - y);
    arrowTop =
      yMaxPosition - arrowPosition > arrowHeight
        ? arrowPosition - arrowHeight
        : arrowPosition;
  }

  return {
    transform,
    arrowDirection,
    tooltipX,
    tooltipY,
    arrowTop,
  };
};
