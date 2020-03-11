import React, { FC, MutableRefObject } from 'react';
import { Margins, Dimension, Theme, ScaleSettings } from '../types';
declare type Props = {
  svgDimensions: Dimension;
  margins: Margins;
  theme: Theme;
  children: React.ReactNode;
  yScaleSettings?: ScaleSettings;
  xScaleSettings?: ScaleSettings;
  ref?: MutableRefObject<SVGSVGElement>;
};
declare const ChartBase: FC<Props>;
export default ChartBase;
