import styled from 'styled-components';
import { FakeInput } from '@keen.io/ui-core';

export const Container = styled.div`
  width: 100%;
  position: relative;

  & iframe {
    max-width: 100% !important;
    height: 40px !important;
    overflow: hidden;
  }
`;

export const Input = styled(FakeInput)`
  display: flex;
  align-items: center;
`;
