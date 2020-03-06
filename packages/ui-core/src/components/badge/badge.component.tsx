import React, { FC } from 'react';

import { StyledBadge, BadgeType } from './badge.styles';

type Props = {
  children: React.ReactNode;
  type: BadgeType;
};

export const Badge: FC<Props> = ({ children, type }) => (
  <StyledBadge type={type}>{children}</StyledBadge>
);

export default Badge;
