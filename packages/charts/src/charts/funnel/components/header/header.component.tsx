import React, { FC } from 'react';
import { Badge, Text } from '@keen.io/ui-core';

import { Container, TextContainer, Label } from './header.styles';

import { Theme } from '../../../../types';

type Props = {
  /* Theme configuration */
  theme: Pick<Theme, 'funnel'>;
  /** Percentage value for step */
  percentageValue: number;
  /** Step value */
  value: number | string;
  /** Step label */
  label: string;
  /** Layout configuration */
  flipBadge?: boolean;
};

export const Header: FC<Props> = ({
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
            <Text {...header.value.typography}>{value}</Text>
          </TextContainer>
        )}
        <Label title={label}>
          <Text truncate {...header.title.typography}>
            {label}
          </Text>
        </Label>
      </div>
      {header.badge.enabled && (
        <div>
          <Badge variant={header.badge.variant}>
            <Text {...header.badge.typography}>
              {percentageValue.toFixed(0)}%
            </Text>
          </Badge>
        </div>
      )}
    </Container>
  );
};

export default Header;
