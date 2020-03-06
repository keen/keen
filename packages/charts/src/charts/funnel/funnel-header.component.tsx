import React, { FC } from 'react';
import { Badge, Text } from '@keen.io/ui-core';

import {
  Container,
  TextContainer,
  LabelContainer,
} from './funnel-header.styles';

import { Theme } from '../../types';

type Props = {
  theme: Pick<Theme, 'funnel'>;
  percentageValue: number;
  value: number | string;
  label: string;
  flipBadge?: boolean;
};

export const FunnelHeader: FC<Props> = ({
  label,
  percentageValue,
  flipBadge = false,
  value,
  theme,
}) => {
  const {
    funnel: { header },
  } = theme;

  return (
    <Container useColumns={flipBadge}>
      <div>
        {header.value.enabled && (
          <TextContainer>
            <Text data-test="step-value" {...header.value.typography}>
              {value}
            </Text>
          </TextContainer>
        )}
        <LabelContainer title={label}>
          <Text data-test="step-label" truncate {...header.title.typography}>
            {label}
          </Text>
        </LabelContainer>
      </div>
      {header.badge.enabled && (
        <div>
          <Badge data-test="step-badge" type="dark">
            <Text data-test="badge-text" {...header.badge.typography}>
              {percentageValue.toFixed(0)}%
            </Text>
          </Badge>
        </div>
      )}
    </Container>
  );
};

export default FunnelHeader;
