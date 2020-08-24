/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import styled from 'styled-components';

import { Dropdown } from './dropdown.component';
import Button from '../button';

export default {
  title: 'Components|Dropdown',
  parameters: {
    component: Dropdown,
    componentSubtitle: 'Dropdown component with customized motion properties',
  },
};

const Container = styled.div`
  position: relative;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const basic = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </Button>
      <Container>
        <Dropdown isOpen={isOpen} fullWidth={false}>
          <Content>Content</Content>
        </Dropdown>
      </Container>
    </>
  );
};
