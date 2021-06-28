import React, { FC } from 'react';
import { MetricChart, MetricChartSettings } from '@keen.io/charts';
import { Card } from '@keen.io/ui-core';

import WidgetHeading from '../widget-heading.component';

import { Container, HeadingPosition } from './metric.widget.styles';

import { WidgetSettings } from '../../types';

type Props = WidgetSettings & MetricChartSettings;

/** Metric Chart widget integrated with other components */
export const MetricChartWidget: FC<Props> = ({
  card,
  title,
  subtitle,
  tags,
  ...props
}) => {
  return (
    <>
      <Card {...card} hideOverflow>
        <Container>
          <MetricChart {...props} />
          <HeadingPosition>
            <WidgetHeading title={title} subtitle={subtitle} tags={tags} />
          </HeadingPosition>
        </Container>
      </Card>
    </>
  );
};

export default MetricChartWidget;
