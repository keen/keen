import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.td<{
  textAlignment: 'left' | 'right';
}>`
  padding: 15px;
  border-right: 1px solid ${colors.gray[200]};
  text-align: ${props => props.textAlignment};

  &:last-of-type {
    border-right: none;
  }
`;
