import React, { FC } from 'react';
import { MetricChart, MetricChartSettings } from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';

import { Layout } from './metric.widget.styles';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & MetricChartSettings;

/** Metric Chart widget integrated with other components */
export const MetricChartWidget: FC<Props> = ({
  title,
  subtitle,
  card,
  ...props
}) => (
  <Card {...card}>
    <Layout>
      <WidgetHeading title={title} subtitle={subtitle} />
      <MetricChart {...props} />
    </Layout>
  </Card>
);

export default MetricChartWidget;
