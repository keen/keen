import React from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';
export declare type ScaleContextType = {
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number> | ScaleBand<string>;
};
declare const ScaleContext: React.Context<{}>;
export default ScaleContext;
