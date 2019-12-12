import React from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';

export type ScaleContextType = {
  xScale: ScaleBand<string> | ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number> | ScaleBand<string>;
};

const ScaleContext = React.createContext({});

export default ScaleContext;
