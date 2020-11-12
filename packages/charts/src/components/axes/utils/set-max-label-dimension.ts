import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { Dimension, Axis } from '../../../types';

type Options = {
  /** Scale settings */
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  /** SVG dimension */
  svgDimensions: Dimension;
  /** Axis theme settings */
  axisTheme: Axis;
};

const MAX_SPACE_TRESHOLD = 0.2;

export const setYLabelsDimension = ({ svgDimensions, axisTheme }: Options) => {
  const {
    labels: { enabled: labelsEnabled },
  } = axisTheme;
  if (!labelsEnabled) return null;
  return MAX_SPACE_TRESHOLD * svgDimensions.width;
};

export const setXLabelsDimension = ({
  scale,
  axisTheme,
  svgDimensions,
}: Options) => {
  const {
    labels: { radiusAngle, enabled: labelsEnabled },
  } = axisTheme;

  if (!labelsEnabled) return null;

  if (radiusAngle === 0) {
    if ('bandwidth' in scale) {
      return scale.bandwidth();
    }

    return null;
  }

  return MAX_SPACE_TRESHOLD * svgDimensions.height;
};
