import React, { FC } from 'react';

import { Container, Content, Line } from './content-separator.styles';

type Props = {
  children: React.ReactNode;
};

export const ContentSeparator: FC<Props> = ({ children }) => (
  <Container>
    <Line />
    <Content>{children}</Content>
    <Line />
  </Container>
);

export default ContentSeparator;
