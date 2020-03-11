import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Tick, Orientation, ScaleSettings } from './types';
export declare const EDGE_TICK_ALIGN = 4;
export declare const getKeysDifference: (
  keys: string[],
  disabledKeys: string[]
) => string[];
export declare const normalizeToPercent: (
  data: object[],
  keys: string[]
) => {
  [x: string]: any;
}[];
export declare const getCenterPosition: (
  scale: ScaleBand<string>
) => (value: string) => number;
export declare const getValues: (data: object[], keys: string[]) => number[];
export declare const calculateStackedRange: (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  minimum: number;
  maximum: number;
};
export declare const calculateRange: (
  data: object[],
  minValue: number | 'auto',
  maxValue: number | 'auto',
  keys: string[]
) => {
  minimum: number;
  maximum: number;
};
export declare const calculateScaleDomain: (
  scale: ScaleLinear<number, number>,
  minimum: number,
  maximum: number
) => void;
export declare const getTimeScaleValues: (
  scale: ScaleTime<number, number>,
  { precision }: ScaleSettings
) => Date[];
export declare const getScaleValues: (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  scaleSettings?: ScaleSettings
) => string[] | number[] | Date[];
export declare const generateTicks: ({
  scale,
  tickSize,
  orientation,
  scaleSettings,
  x,
  y,
}: {
  x: number;
  y: number;
  tickSize: number;
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation?: Orientation;
  scaleSettings?: ScaleSettings;
}) => Tick[];
