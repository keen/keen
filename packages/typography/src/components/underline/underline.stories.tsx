import * as React from 'react';
import styled from 'styled-components';

import Underline from './underline.component';

export default {
  title: 'Typography / Underline',
  parameters: {
    component: Underline,
    componentSubtitle: 'Displays text with underline text decoration',
  },
};

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 6px;
`;

export const basic = () => (
  <Container>
    <Wrapper>
      <Underline>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </Underline>
    </Wrapper>
  </Container>
);

basic.story = {
  parameters: {
    docs: {
      storyDescription: 'Underline',
    },
  },
};
