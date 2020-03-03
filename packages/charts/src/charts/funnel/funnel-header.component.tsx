import React, { FC } from 'react';
import { Badge, Text } from '@keen.io/ui-core';

import { TextContainer, LabelContainer } from './funnel-header.styles';

import { Theme } from '../../types';

type Props = {
  theme: Pick<Theme, 'funnel'>;
  percentageValue: number;
  value: number;
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
      <TextContainer>
        <Text {...header.value.typography}>{value}</Text>
      </TextContainer>
      <LabelContainer>
        <Text truncate {...header.title.typography}>
          {label}
        </Text>
      </LabelContainer>
      {header.badge.enabled && (
        <Badge type="dark">
          <Text {...header.badge.typography}>
            {percentageValue.toFixed(0)}%
          </Text>
        </Badge>
      )}
    </>
  );
};

export default FunnelHeader;
