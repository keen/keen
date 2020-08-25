import React, { FC } from 'react';

import { Container } from './header.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
};

export const DropdownMenuHeader: FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

export default DropdownMenuHeader;
