import React from 'react';
import { ScaleSettings } from '@keen.io/charts-utils';

import { Dimension, Margins, Theme } from '../types';

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
