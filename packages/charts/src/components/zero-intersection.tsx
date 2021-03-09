import React, { useContext } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';
import {
  getZeroIntersectionVisibility,
  calculateZeroIntersection,
} from './zero-intersection.utils';

import { Line } from './elements';

import { ChartContext, ChartContextType } from '../contexts';

type Props = {
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
  layout?: Layout;
};

export const ZeroIntersection = ({
  xScale,
  yScale,
  layout = 'vertical',
}: Props) => {
  const {
    svgDimensions,
    margins,
    theme: { gridX, gridY, zeroIntersection },
  } = useContext(ChartContext) as ChartContextType;

  const isVisible = getZeroIntersectionVisibility(
    layout,
    xScale,
    yScale,
    gridX.enabled,
    gridY.enabled
  );
  const line =
    isVisible &&
    calculateZeroIntersection(layout, xScale, yScale, svgDimensions, margins);

  return (
    <>
      {isVisible && (
        <Line
          data-testid="zero-intersection"
          color={zeroIntersection.color}
          {...line}
        />
      )}
    </>
  );
};

export default ZeroIntersection;
