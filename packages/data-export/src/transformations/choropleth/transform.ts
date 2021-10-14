import { formatValue as valueFormatter } from '@keen.io/charts-utils';
import { ChoroplethChartSettings } from '@keen.io/charts';
import { extractGroupBySettings } from '@keen.io/query';
import { KEEN_KEY, KEEN_VALUE, KEEN_ELEMENTS } from '@keen.io/parser';

import { VALUE } from '../../constants';
import { TransformationInput } from '../../types';

export const transform = ({
  query,
  chartSettings,
}: TransformationInput<ChoroplethChartSettings>) => {
  const { data, tooltipSettings } = chartSettings;
  const { group_by: groupBy } = query;
  const dataSeriesGroups = extractGroupBySettings(groupBy);
  const isMultiGroupBy = dataSeriesGroups.length > 1;
  const formatValue = tooltipSettings?.formatValue;

  const [geographicAreaProperty] = dataSeriesGroups;

  if (isMultiGroupBy) {
    const [, groupProperty] = dataSeriesGroups;
    const columns = [geographicAreaProperty, groupProperty, VALUE];
    const rows: any[] = [];

    data.forEach((item: Record<string, any>) => {
      const groupElements = item[KEEN_ELEMENTS];
      const elementsKeys = Object.keys(item[KEEN_ELEMENTS]);

      rows.push(
        ...elementsKeys.map((keyName) => [
          item[KEEN_KEY],
          keyName,
          valueFormatter(groupElements[keyName], formatValue),
        ])
      );
    });

    return [columns, ...rows];
  } else {
    return [
      [geographicAreaProperty, VALUE],
      ...data.map((item) => [
        item[KEEN_KEY],
        valueFormatter(item[KEEN_VALUE], formatValue),
      ]),
    ];
  }
};
