import React, { FC, useState, useCallback, useEffect } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

import { getMaxDimensionValue } from './utils';

import { Theme } from '../../types';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Theme settings */
  theme: Theme;
  /** X scale definition */
  xScale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  /** Y scale definition */
  yScale: ScaleBand<string> | ScaleLinear<number, number>;
  /** X Scale settings */
  xScaleSettings?: ScaleSettings;
  /** Y Scale settings */
  yScaleSettings?: ScaleSettings;
};

const ComputeAxesMargins: FC<Props> = ({
  children,
  theme,
  xScale,
  xScaleSettings,
  yScale,
  yScaleSettings,
}) => {
  const [renderChildren] = useState(false);
  const [labels, setLabels] = useState<{ longestX: string; longestY: string }>(
    null
  );

  const { axisX, axisY } = theme;
  const {
    labels: { typography: axisYTypography },
  } = axisY;
  const {
    labels: { typography: axisXTypography },
  } = axisX;

  const calculateX = useCallback(element => {
    if (element) {
      const { width, height } = element.getBBox();
      console.log(width, height);
    }
  }, []);

  useEffect(() => {
    setLabels({
      longestX: getMaxDimensionValue(xScale, xScaleSettings),
      longestY: getMaxDimensionValue(yScale, yScaleSettings),
    });
  }, []);

  return (
    <>
      {renderChildren ? (
        children
      ) : (
        <g opacity="0">
          {labels && (
            <>
              <text ref={calculateX} {...axisXTypography}>
                {labels.longestX}
              </text>
              <text ref={calculateX} {...axisYTypography}>
                {labels.longestY}
              </text>
            </>
          )}
        </g>
      )}
    </>
  );
};

export default ComputeAxesMargins;
