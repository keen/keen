import React, { FC } from 'react';
import { MetricChart, MetricChartSettings } from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';

import WidgetHeading from '../widget-heading.component';

import { Container, HeadingPosition } from './metric.widget.styles';

import { WidgetSettings } from '../../types';
type Props = WidgetSettings & MetricChartSettings;

const Widget = ({ title, subtitle, tags, ...props }: Props) => {
  return (
    <Container>
      <MetricChart {...props} />
      <HeadingPosition>
        <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
      </HeadingPosition>
    </Container>
  );
};

/** Metric Chart widget integrated with other components */
export const MetricChartWidget: FC<Props> = ({
  card,
  title,
  subtitle,
  tags,
  ...props
}) => (
  <Card {...card} hideOverflow>
    <Widget title={title} subtitle={subtitle} tags={tags} {...props} />
  </Card>
);

export default MetricChartWidget;
