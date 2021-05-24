import React, { FC } from 'react';
import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { LegendCard } from './card.styles';
import { LegendCardSettings } from '../types';

type Props = {
  borderPosition: Position;
  fullDimension?: boolean;
} & LegendCardSettings;

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
