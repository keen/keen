import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { CellTextAlignment } from '../../types';

export const StyledCell = styled.td`
  padding: 0;
  border-right: 1px solid ${colors.gray[200]};
  position: relative;

  &:last-of-type {
    border-right: none;
  }
`;

export const Container = styled.div<{
  textAlignment: CellTextAlignment;
}>`
  padding: 10px 15px;
  text-align: ${(props) => props.textAlignment};
`;
