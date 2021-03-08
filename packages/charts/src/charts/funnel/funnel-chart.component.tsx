import React, { FC } from 'react';
import { Layout } from '@keen.io/ui-core';
import { formatNumber } from '@keen.io/charts-utils';

import { theme as defaultTheme } from '../../theme';

import { Step } from './components';
import { Container } from './funnel-chart.styles';

import { generateFunnel } from './utils';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels */
  labelSelector: string;
  /** Custom labels for funnel steps */
  stepLabels?: string[];
  /** Layout applied on chart steps */
  layout?: Layout;
  /** Key used to pick value property from data */
  valueKey?: string;
  /** Function used to format step values */
  formatValues?: (value: number) => string | number;
} & CommonChartSettings;

export const FunnelChart: FC<Props> = ({
  data,
  labelSelector,
  stepLabels = [],
  valueKey = 'value',
  layout = 'horizontal',
  theme = defaultTheme,
  formatValues = formatNumber,
  margins = { top: 0, left: 0, right: 0, bottom: 0 },
}) => {
  const { steps, scale } = generateFunnel({
    data,
    key: valueKey,
    colors: theme.colors,
  });

  return (
    <Container layout={layout}>
      {steps.map(
        (
          { percentageValue, nextPercentageValue, value, color, index },
          idx
        ) => (
          <Step
            key={idx}
            label={stepLabels[idx] || data[index][labelSelector]}
            theme={theme}
            stepsCount={steps.length}
            index={idx}
            value={formatValues(value)}
            percentageValue={percentageValue}
            nextPercentageValue={nextPercentageValue}
            color={color}
            scale={scale.copy()}
            layout={layout}
            margins={margins}
          />
        )
      )}
    </Container>
  );
};

export default FunnelChart;
