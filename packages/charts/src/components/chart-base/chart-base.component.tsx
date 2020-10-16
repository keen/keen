import React, { FC, Ref, forwardRef } from 'react';
import { ScaleSettings } from '@keen.io/charts-utils';

import { ChartContext } from '../../contexts';

import { Margins, Dimension, Theme } from '../../types';

type Props = {
  svgDimensions: Dimension;
  margins: Margins;
  theme: Theme;
  children: React.ReactNode;
  yScaleSettings?: ScaleSettings;
  xScaleSettings?: ScaleSettings;
  ref?: Ref<SVGSVGElement>;
};

const ChartBase: FC<Props> = forwardRef(
  (
    { theme, xScaleSettings, yScaleSettings, svgDimensions, margins, children },
    ref
  ) => (
    <ChartContext.Provider
      value={{
        theme,
        xScaleSettings,
        yScaleSettings,
        svgDimensions,
        margins,
      }}
    >
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        preserveAspectRatio="xMinYMin"
        width="100%"
        height="100%"
      >
        {children}
      </svg>
    </ChartContext.Provider>
  )
);

ChartBase.displayName = 'ChartBase';

export default ChartBase;
