import styled from 'styled-components';
import { Typography } from '@keen.io/ui-core';

export const Container = styled.tr<{
  typography: Typography;
}>`
  ${props => props.typography}
  color: ${props => props.typography.fontColor};
`;

export const StickyCell = styled.td<{
  color: string;
}>`
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${props => props.color};
`;
