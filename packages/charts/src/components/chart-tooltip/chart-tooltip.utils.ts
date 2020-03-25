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
  const hasOverflow = x + width >= xMaxPosition;

  const yMinPosition = 0;
  const yMaxPosition = svgDimensions.height;

  const hasOverflowBottom = y + 0.5 * height >= yMaxPosition;
  const hasOverflowTop = y > 0 && y - 0.5 * height <= yMinPosition;

  let translateX = 'translateX(20px)';
  let translateY = 'translateY(-50%)';
  let arrowOffset;

  if (hasOverflowBottom) {
    const overflowBottom = y - yMaxPosition - height / 2;
    translateY = `translateY(${overflowBottom}px)`;
    arrowOffset = `${-overflowBottom}px`;
  }

  if (hasOverflowTop) {
    translateY = `translateY(-${y}px)`;
    arrowOffset = `${y}px`;
  }

  if (hasOverflow) {
    translateX = 'translateX(-20px)';
  }

  return {
    transform: `${translateX} ${translateY}`,
    arrowDirection: hasOverflow ? 'right' : 'left',
    tooltipX: hasOverflow ? x - width : x,
    arrowOffset,
  };
};
