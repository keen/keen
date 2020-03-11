/// <reference types="react" />
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
declare type Props = {
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
};
export declare const Grid: ({ xScale, yScale }: Props) => JSX.Element;
export default Grid;
