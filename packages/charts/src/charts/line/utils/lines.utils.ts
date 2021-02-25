import { ScaleLinear, ScaleTime } from 'd3-scale';

import { line as lineShape, curveStep, curveMonotoneX } from 'd3-shape';

import { CurveType } from '../types';

/**
 * Prepare a function for line calculation.
 *
 * @param curve - curve type connecting points
 * @param xScale - time scale
 * @param yScale - linear scale
 * @param labelSelector - selected label from data
 * @param keyName - key of series
 * @return a function to generate path string for line
 *
 */

export const calculatePath = (
  curve: CurveType,
  xScale: ScaleTime<number, number>,
  yScale: ScaleLinear<number, number>,
  labelSelector: string,
  keyName: string
) => {
  let lineShapeType;
  switch (curve) {
    case 'spline':
      lineShapeType = lineShape().curve(curveMonotoneX);
      break;

    case 'step':
      lineShapeType = lineShape().curve(curveStep);
      break;

    default:
      lineShapeType = lineShape();
      break;
  }

  return lineShapeType
    .x(function (d: Record<string, any>) {
      return xScale(d[labelSelector]);
    })
    .y(function (d: Record<string, any>) {
      return yScale(d[keyName]);
    });
};
