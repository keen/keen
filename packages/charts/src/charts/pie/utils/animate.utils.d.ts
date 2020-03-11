import { MutableRefObject } from 'react';
import { Arc, DefaultArcObject } from 'd3-shape';
import 'd3-transition';
import { ValueFn } from 'd3-selection';
export declare type ArcProperties = {
  startAngle: number;
  endAngle: number;
};
export declare const createArcTween: (
  currentArc: ArcProperties,
  updatedArc: ArcProperties,
  arc: Arc<any, Partial<DefaultArcObject>>
) => () => (t: number) => string;
export declare const animateArcPath: (
  element: MutableRefObject<SVGPathElement>,
  tween: ValueFn<any, any, (t: number) => string>,
  onMotionEnd: () => void,
  duration?: number
) => void;
