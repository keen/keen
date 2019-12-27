import React from 'react';

import { Dimension, Margins, Theme } from '../types';

export type ChartContextType = {
  theme: Theme;
  svgDimensions: Dimension;
  margins: Margins;
  data: object[];
};

const ChartContext = React.createContext({});

export default ChartContext;
