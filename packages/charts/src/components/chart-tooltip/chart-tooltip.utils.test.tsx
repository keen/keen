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

  it('should return vertical min overflow', () => {
    const props = {
      x: 50,
      y: 10,
      width: 20,
      height: 20,
    };
    const { tooltipY } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(tooltipY).toEqual(props.height / 2);
  });

  it('should return vertical max overflow', () => {
    const props = {
      x: 50,
      y: 90,
      width: 20,
      height: 20,
    };
    const { tooltipY } = calculateTooltipPosition({
      svgDimensions,
      margins,
      ...props,
    });

    expect(tooltipY).toEqual(
      svgDimensions.height - margins.top - props.height / 2
    );
  });
});
