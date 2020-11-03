import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

type ScaleValues = (string | number | Date)[];

/**
 * Get the longest scale domain value
 *
 * @param scale - scale definition
 * @param settings - scale settings
 * @return object with offset and scroll values.
 *
 */
const getMaxDimensionValue = (
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  settings?: ScaleSettings
) => {
  let values = (scale.domain() as ScaleValues).filter(v => v !== null);

  if (settings && settings.formatLabel) {
    values = values.map(v => settings.formatLabel(v));
  }

  if (values.length) {
    return values
      .map(v => v.toString())
      .reduce((a, b) => (a.length > b.length ? a : b));
  }

  return '';
};

export default getMaxDimensionValue;
