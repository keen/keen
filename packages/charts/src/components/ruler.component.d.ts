/// <reference types="react" />
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Axis, Orientation, ScaleSettings } from '../types';
declare type Props = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  x: number;
  y: number;
  scaleSettings?: ScaleSettings;
} & Axis;
declare const Ruler: ({
  scale,
  x,
  y,
  tickPadding,
  orientation,
  tickSize,
  stroke,
  labels,
  color,
  scaleSettings,
}: Props) => JSX.Element;
export default Ruler;
