/* eslint-disable */
import { calculateTooltipPosition } from './chart-tooltip.utils';

describe('@keen.io/charts - <ChartTooltip /> utils', () => {
  const svgDimensions = { width: 100, height: 100 };
  const margins = { top: 10, left: 10, bottom: 10, right: 10 };

  it('should return no overflow', () => {
    const props = {
      x: 0,
      y: 50,
      width: 10,
      height: 10,
    };
    const { arrowDirection, tooltipX } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(arrowDirection).toEqual('left');
    expect(tooltipX).toEqual(props.x);
  });

  it('should return horizontal overflow', () => {
    const props = {
      x: 80,
      y: 50,
      width: 20,
      height: 10,
    };
    const { arrowDirection, tooltipX } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(arrowDirection).toEqual('right');
    expect(tooltipX).not.toEqual(props.x);
  });

  it('should return vertical overflow on top', () => {
    const props = {
      x: 0,
      y: 10,
      width: 20,
      height: 20,
    };
    const { arrowOffset } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(arrowOffset).toEqual(`${props.y}px`);
  });

  it('should return vertical overflow on bottom', () => {
    const props = {
      x: 0,
      y: svgDimensions.height - margins.bottom,
      width: 20,
      height: 20,
    };
    const { arrowOffset } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(arrowOffset).toEqual(`${props.height}px`);
  });
});
