import React, { FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { theme as defaultTheme } from '../../theme';

import FunnelStep from './funnel-step.component';
import { FunnelContainer } from './funnel-chart.styles';

import { generateFunnel } from './utils';
import { formatNumber } from '../../utils/format.utils';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Name of data object property used to create labels */
  labelSelector: string;
  /** Layout applied on chart steps */
  layout?: Layout;
  /** Key used to pick value property from data */
  key?: string;
  /** Function used to format step values */
  formatValues?: (value: number) => string | number;
} & CommonChartSettings;

export const FunnelChart: FC<Props> = ({
  data,
  labelSelector,
  key = 'value',
  layout = 'horizontal',
  theme = defaultTheme,
  formatValues = formatNumber,
  margins = { top: 0, left: 0, right: 0, bottom: 0 },
}) => {
  const { steps, scale } = generateFunnel({
    data,
    key,
    colors: theme.colors,
  });

  return (
    <FunnelContainer layout={layout}>
      {steps.map(
        (
          { percentageValue, nextPercentageValue, value, color, index },
          idx
        ) => (
          <FunnelStep
            key={idx}
            label={data[index][labelSelector]}
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
    </FunnelContainer>
  );
};

export default FunnelChart;
