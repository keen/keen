import React from 'react';
import { Dimension, Margins, Theme, ScaleSettings } from '../types';
export declare type ChartContextType = {
  theme: Theme;
  svgDimensions: Dimension;
  margins: Margins;
  xScaleSettings: ScaleSettings;
  yScaleSettings: ScaleSettings;
  data: object[];
};
declare const ChartContext: React.Context<{}>;
export default ChartContext;
