import React from 'react';

import { ChartContext } from '../contexts';

import { Margins, Dimension, Theme, ScaleSettings } from '../types';

type Props = {
  svgDimensions: Dimension;
  margins: Margins;
  theme: Theme;
  children: React.ReactNode;
  xScaleSettings?: ScaleSettings;
};

const ChartBase = ({
  children,
  svgDimensions,
  xScaleSettings,
  margins,
  theme,
}: Props) => (
  <ChartContext.Provider
    value={{
      theme,
      xScaleSettings,
      svgDimensions,
      margins,
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      preserveAspectRatio="xMinYMin"
      width="100%"
      height="100%"
    >
      {children}
    </svg>
  </ChartContext.Provider>
);

export default ChartBase;
