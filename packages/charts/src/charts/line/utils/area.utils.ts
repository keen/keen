import { ScaleLinear, ScaleTime } from 'd3-scale';

import { area, curveStep, curveMonotoneX } from 'd3-shape';

import { CurveType } from '../types';

export const calculateArea = (
  curve: CurveType,
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string,
  minValue?: number | 'auto',
  maxValue?: number | 'auto',
  isNegative?: boolean
) => {
  let lineShapeType;
  switch (curve) {
    case 'spline':
      lineShapeType = area().curve(curveMonotoneX);
      break;

    case 'step':
      lineShapeType = area().curve(curveStep);
      break;

    default:
      lineShapeType = area();
      break;
  }

  return lineShapeType
    .x(function (d: Record<string, any>) {
      return xScale(d[labelSelector]);
    })
    .y1(function (d: Record<string, any>) {
      if (isNegative) {
        if (maxValue !== 'auto')
          return yScale(yScale.ticks()[yScale.ticks().length - 1]);
        return yScale(0);
      }
      return yScale(d[keyName]);
    })
    .y0(function (d: Record<string, any>) {
      if (isNegative) {
        return yScale(d[keyName]);
      }
      if (minValue !== 'auto' && minValue > 0) return yScale(yScale.ticks()[0]);
      return yScale(0);
    });
};
