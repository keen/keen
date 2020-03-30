import React, { FC } from 'react';
import { CardSettings, Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { LegendCard } from './card.styles';

type Props = {
  borderPosition: Position;
  fullDimension?: boolean;
} & CardSettings;

const Card: FC<Props> = ({
  backgroundColor = colors.white['500'],
  hasShadow = true,
  fullDimension = false,
  ...props
}) => (
  <LegendCard
    fullDimension={fullDimension}
    backgroundColor={backgroundColor}
    hasShadow={hasShadow}
    {...props}
  />
);

export default Card;
