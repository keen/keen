import * as React from 'react';
import styled from 'styled-components';

import Italic from './italic.component';

export default {
  title: 'Typography / Italic',
  parameters: {
    component: Italic,
    componentSubtitle: 'Displays text with italic font style',
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
      <Italic>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Italic>
    </Wrapper>
  </Container>
);

basic.story = {
  parameters: {
    docs: {
      storyDescription: 'Italic',
    },
  },
};
