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
  width,
}: Options) => {
  const xMaxPosition = svgDimensions.width - margins.right;
  const hasOverflow = x + width >= xMaxPosition;

  const withOverflow = {
    transform: 'translateY(-50%) translateX(-20px)',
    arrowDirection: 'right',
    tooltipX: x - width,
  };

  const noOverflow = {
    transform: 'translateY(-50%) translateX(20px)',
    arrowDirection: 'left',
    tooltipX: x,
  };

  return hasOverflow ? withOverflow : noOverflow;
};
