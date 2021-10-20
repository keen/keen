import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { CellTextAlignment } from '../../types';

export const Container = styled.div<{
  textAlignment: CellTextAlignment;
  isActive: boolean;
}>`
  padding: 15px;
  text-align: ${(props) => props.textAlignment};
  box-shadow: inset -1px 0px 0px 0px ${colors.gray[200]};

  ${({ isActive }) =>
    isActive &&
    css`
      box-shadow: none;
    `};
`;

export const StyledCell = styled.td`
  padding: 0;
  position: relative;

  &:last-of-type {
    ${Container} {
      box-shadow: none;
    }
  }
`;
