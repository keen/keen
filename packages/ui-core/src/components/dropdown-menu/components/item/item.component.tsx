import React, { FC } from 'react';

import { Container } from './item.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Click event handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Item: FC<Props> = ({ children, onClick }) => (
  <Container
    onClick={e => onClick && onClick(e)}
    role="listitem"
    data-testid="dropdown-menu-item"
  >
    {children}
  </Container>
);

export default Item;
