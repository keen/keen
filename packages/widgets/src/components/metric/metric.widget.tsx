import React, { FC } from 'react';
import { MetricChart, MetricChartSettings } from '@keen.io/charts';
import { Card, Badge } from '@keen.io/ui-core';

import { Container, TagContainer } from './metric.widget.styles';

import { WidgetSettings, Tag } from '../../types';

type Props = WidgetSettings & MetricChartSettings;

/** Metric Chart widget integrated with other components */
export const MetricChartWidget: FC<Props> = ({ card, tags, ...props }) => {
  return (
    <>
      <Card {...card} hideOverflow>
        <Container>
          {tags && (
            <TagContainer>
              {tags.map(({ label, variant }: Tag) => (
                <Badge key={label} variant={variant}>
                  {label}
                </Badge>
              ))}
            </TagContainer>
          )}
          <MetricChart {...props} />
        </Container>
      </Card>
    </>
  );
};

export default MetricChartWidget;
