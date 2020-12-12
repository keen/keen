import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';

import getTimeScaleValues from '../get-time-scale-values';

import { ScaleSettings } from '../../types';

/**
 * Calculates values of the scale.
 *
 * @param scale - time scale
 * @param scaleSettings - scale settings
 * @param useUTC - use universal coordinated time
 * @return Collection of scale values
 *
 */
const getScaleValues = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  scaleSettings?: ScaleSettings,
  useUTC = false
) => {
  if ('bandwidth' in scale) return scale.domain();
  if (scaleSettings?.type === 'time') {
    return getTimeScaleValues(
      scale as ScaleTime<number, number>,
      scaleSettings,
      useUTC
    );
  }

  return scale.ticks();
};

export default getScaleValues;
