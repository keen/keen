import React, { FC } from 'react';
import { MetricChart, MetricChartSettings } from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & MetricChartSettings;

/** Metric Chart widget integrated with other components */
export const MetricChartWidget: FC<Props> = ({ card, ...props }) => {
  return (
    <>
      <Card {...card} hideOverflow>
        <MetricChart {...props} />
      </Card>
    </>
  );
};

export default MetricChartWidget;
