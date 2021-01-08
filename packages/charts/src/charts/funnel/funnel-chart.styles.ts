import styled from 'styled-components';
import { Layout } from '@keen.io/ui-core';

export const FunnelContainer = styled.div<{
  layout: Layout;
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.layout === 'horizontal' ? 'row' : 'column'};
  height: 100%;
  width: 100%;
`;
