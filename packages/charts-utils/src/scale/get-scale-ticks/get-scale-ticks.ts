import { ScaleLinear, ScaleBand, ScaleTime } from 'd3-scale';

import { createTimeIntervals } from '../../time/';

import { ScaleSettings } from '../../types';

/**
 * Creates tick values based on type of the scale.
 *
 * @param scale - time scale
 * @param scaleSettings - scale settings
 * @return Collection of scale values
 *
 */
const getScaleTicks = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  scaleSettings?: ScaleSettings
) => {
  if ('bandwidth' in scale)
    return {
      ticks: scale.domain(),
      ticksPrecision: scaleSettings?.precision,
    };
  if (scaleSettings?.type === 'time') {
    const { ticks, precision: ticksPrecision } = createTimeIntervals(
      scale as ScaleTime<number, number>
    );

    return {
      ticks,
      ticksPrecision,
    };
  }

  return {
    ticks: scale.ticks(),
    ticksPrecision: scaleSettings?.precision,
  };
};

export default getScaleTicks;
