import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Orientation, ScaleSettings, LabelRotation } from '../types';
declare type Options = {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  scaleSettings?: ScaleSettings;
  formatLabel?: (label: string | number) => string | number;
};
export declare const createRuler: ({
  x,
  y,
  tickSize,
  scale,
  orientation,
  scaleSettings,
}: Options) => {
  line: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  ticks: import('../types').Tick[];
};
export declare const rotateLabel: (
  orientation: string,
  radiusAngle: number,
  tickPadding: number,
  tickSize: number
) => LabelRotation;
export {};
