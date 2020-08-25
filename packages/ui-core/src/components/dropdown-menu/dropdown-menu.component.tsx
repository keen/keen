import React, { FC } from 'react';

import { Container } from './dropdown-menu.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
};

export const DropdownMenu: FC<Props> = ({ children }) => (
  <Container role="list">{children}</Container>
);

export default DropdownMenu;
