import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';

import getTimeScaleValues from '../get-time-scale-values';

import { ScaleSettings } from '../../types';

/**
 * Calculates values of the scale.
 *
 * @param scale - time scale
 * @param settings - scale settings
 * @return Collection of scale values
 *
 */
const getScaleValues = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  scaleSettings?: ScaleSettings
) => {
  if ('bandwidth' in scale) return scale.domain();
  if (scaleSettings?.type === 'time') {
    return getTimeScaleValues(
      scale as ScaleTime<number, number>,
      scaleSettings
    );
  }

  return scale.ticks();
};

export default getScaleValues;
