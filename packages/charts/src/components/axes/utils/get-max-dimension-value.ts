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
  let values: string[] = (scale.domain() as ScaleValues).map(v => v.toString());
  if (settings && settings.formatLabel) {
    values = (scale.domain() as string[]).map(v =>
      settings.formatLabel(v).toString()
    );
  }

  if (values.length) {
    return values.reduce((a, b) => (a.length > b.length ? a : b));
  }

  return '';
};

export default getMaxDimensionValue;
