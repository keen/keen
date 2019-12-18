import React from 'react';

import { ChartContext } from '../contexts';

import { Margins, Dimension, ChartTheme } from '../types';

type Props = {
  svgDimensions: Dimension;
  margins: Margins;
  theme: ChartTheme;
  children: React.ReactNode;
};

const ChartBase = ({ children, svgDimensions, margins, theme }: Props) => (
  <ChartContext.Provider
    value={{
      theme,
      svgDimensions,
      margins,
    }}
  >
    <svg width={svgDimensions.width} height={svgDimensions.height}>
      {children}
    </svg>
  </ChartContext.Provider>
);

export default ChartBase;
