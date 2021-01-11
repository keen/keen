import * as React from 'react';
import styled from 'styled-components';

import Brand from './brand.component';

export default {
  title: 'Components /Brand',
  parameters: {
    component: Brand,
  },
};

const Container = styled.div`
  display: flex;
`;

export const Keen = () => (
  <Container>
    <Brand />
  </Container>
);
