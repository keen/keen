import { LineChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';

import { defaultTransformation } from './default-transformation';
import { categoricalTransformation } from './Categorical-transformation';

import { COLUMN_JOIN } from '../../constants';

import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<LineChartSettings>) => {
  const { data, keys, yScaleSettings } = chartSettings;
  const valueFormatter = yScaleSettings?.formatLabel;

  const { group_by: groupBy } = query;
  const isCategoricalAnalysis =
    groupBy && extractGroupBySettings(groupBy).length > 0;

  if (isCategoricalAnalysis) {
    const groupColumnName = extractGroupBySettings(groupBy).join(COLUMN_JOIN);
    return categoricalTransformation(
      data,
      keys,
      valueFormatter,
      groupColumnName
    );
  } else {
    return defaultTransformation(data, keys, valueFormatter);
  }
};
