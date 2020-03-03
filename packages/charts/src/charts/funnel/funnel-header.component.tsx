import React, { FC } from 'react';
import { Badge, Text } from '@keen.io/ui-core';

import { TextContainer, LabelContainer } from './funnel-header.styles';

import { Theme } from '../../types';

type Props = {
  theme: Pick<Theme, 'funnel'>;
  percentageValue: number;
  value: number | string;
  label: string;
};

export const FunnelHeader: FC<Props> = ({
  label,
  percentageValue,
  value,
  theme,
}) => {
  const {
    funnel: { header },
  } = theme;

  return (
    <>
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
      {header.badge.enabled && (
        <Badge data-test="step-badge" type="dark">
          <Text data-test="badge-text" {...header.badge.typography}>
            {percentageValue.toFixed(0)}%
          </Text>
        </Badge>
      )}
    </>
  );
};

export default FunnelHeader;
