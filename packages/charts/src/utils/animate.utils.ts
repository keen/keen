/* eslint-disable  @typescript-eslint/no-inferrable-types */
import { MutableRefObject } from 'react';
import { Arc, DefaultArcObject } from 'd3-shape';
import 'd3-transition';
import { interpolate } from 'd3-interpolate';
import { select, ValueFn } from 'd3-selection';

export type ArcProperties = {
  startAngle: number;
  endAngle: number;
};

export const createArcTween = (
  currentArc: ArcProperties,
  updatedArc: ArcProperties,
  arc: Arc<any, Partial<DefaultArcObject>>
) => {
  const copy = { ...currentArc };

  return () => {
    const interpolateStartAngle = interpolate(
        currentArc.startAngle,
        updatedArc.startAngle
      ),
      interpolateEndAngle = interpolate(
        currentArc.endAngle,
        updatedArc.endAngle
      );

    return (t: number): string => {
      copy.startAngle = interpolateStartAngle(t);
      copy.endAngle = interpolateEndAngle(t);
      return arc(copy);
    };
  };
};

export const animateArcPath = (
  element: MutableRefObject<SVGPathElement>,
  tween: ValueFn<any, any, (t: number) => string>,
  onMotionEnd: () => void,
  duration: number = 500
) => {
  select(element.current)
    .transition()
    .duration(duration)
    .attrTween('d', tween)
    .on('end', onMotionEnd);
};
