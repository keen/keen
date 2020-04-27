import React, { FC } from 'react';

import { StyledBadge, BadgeType } from './badge.styles';

type Props = {
  children: React.ReactNode;
  type: BadgeType;
  backgroundColor?: string;
};

export const Badge: FC<Props> = ({ children, backgroundColor, type }) => (
  <StyledBadge type={type} backgroundColor={backgroundColor}>
    {children}
  </StyledBadge>
);

export default Badge;
