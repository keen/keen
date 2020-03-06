import * as React from 'react';
import styled from 'styled-components';

import { Badge } from './badge.component';

export default {
  title: 'Components / Badge',
  parameters: {
    component: Badge,
    componentSubtitle: 'Displays simple badge with multiple variants support',
  },
};

const Container = styled.div`
  display: flex;
`;

const Variant = styled.div`
  padding: 6px;
`;

export const variants = () => (
  <Container>
    <Variant>
      <Badge type="dark">dark</Badge>
    </Variant>
    <Variant>
      <Badge type="light">light</Badge>
    </Variant>
    <Variant>
      <Badge type="success">success</Badge>
    </Variant>
    <Variant>
      <Badge type="danger">danger</Badge>
    </Variant>
  </Container>
);
