import React from 'react';

import { Dimension, Margins, Theme, ScaleSettings } from '../types';

export type ChartContextType = {
  theme: Theme;
  svgDimensions: Dimension;
  margins: Margins;
  xScaleSettings: ScaleSettings;
  yScaleSettings: ScaleSettings;
  data: object[];
};

const ChartContext = React.createContext({});

export default ChartContext;
