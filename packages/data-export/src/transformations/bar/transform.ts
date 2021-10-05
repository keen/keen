import { BarChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { KEEN_KEY } from '@keen.io/parser';

import { chronologicalTransformation } from './chronological-transformation';
import { categoricalTransformation } from './categorical-transformation';
import { categoricalChronologicalTransformation } from './categorical-chronological-transformation';

import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<BarChartSettings>) => {
  const { keys, data, tooltipSettings, stackMode } = chartSettings;
  const valueFormatter = tooltipSettings?.formatValue;
  const isFunnel = !query;

  if (isFunnel) {
    const [valueSelector] = keys;

    return data.map((item) => [item[KEEN_KEY], item[valueSelector]]);
  } else {
    const { interval, group_by: groupBy } = query;

    const isChronologicalAnalysis = !!interval;
    const isCategoricalAnalysis =
      groupBy && extractGroupBySettings(groupBy).length > 0;

    if (isChronologicalAnalysis && isCategoricalAnalysis) {
      return categoricalChronologicalTransformation(
        data,
        keys,
        valueFormatter,
        extractGroupBySettings(groupBy),
        stackMode === 'percent'
      );
    } else if (isCategoricalAnalysis) {
      return categoricalTransformation(
        data,
        keys,
        valueFormatter,
        extractGroupBySettings(groupBy),
        stackMode === 'percent'
      );
    } else {
      return chronologicalTransformation(data, keys, valueFormatter);
    }
  }
};
