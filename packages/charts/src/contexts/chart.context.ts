import React from 'react';

import { Dimension, Margins, ChartTheme } from '../types';

export type ChartContextType = {
  theme: ChartTheme;
  svgDimensions: Dimension;
  margins: Margins;
  data: object[];
};

const ChartContext = React.createContext({});

export default ChartContext;
