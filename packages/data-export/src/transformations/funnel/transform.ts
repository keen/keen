import { FunnelChartSettings } from '@keen.io/charts';
import { formatValue as valueFormatter } from '@keen.io/charts-utils';
import { KEEN_KEY, KEEN_VALUE } from '@keen.io/parser';

import { calculatePercent } from '../../utils';
import { FUNNEL_STEP, VALUE, PERCENTAGE_VALUE } from '../../constants';

import { TransformationInput } from '../../types';

export const transform = ({
  chartSettings,
}: TransformationInput<FunnelChartSettings>) => {
  const { data, formatValues, stepLabels } = chartSettings;

  const columns = [FUNNEL_STEP, VALUE, PERCENTAGE_VALUE];

  return [
    columns,
    ...data.map((item, idx, collection) => {
      const previousStepTotal = collection[idx - 1]?.[KEEN_VALUE];
      let percentageValue = idx === 0 ? 100 : 0;

      if (previousStepTotal) {
        percentageValue = calculatePercent(item[KEEN_VALUE], previousStepTotal);
      }

      return [
        stepLabels?.[idx] ? stepLabels[idx] : item[KEEN_KEY],
        valueFormatter(item[KEEN_VALUE], formatValues),
        `${percentageValue}%`,
      ];
    }),
  ];
};
