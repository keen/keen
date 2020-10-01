import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const StyledCell = styled.td`
  padding: 0;
  border-right: 1px solid ${colors.gray[200]};

  &:last-of-type {
    border-right: none;
  }
`;

export const Container = styled.div<{
  textAlignment: 'left' | 'right';
}>`
  padding: 15px;
  text-align: ${props => props.textAlignment};
`;
