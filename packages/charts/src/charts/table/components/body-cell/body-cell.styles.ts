import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { CellTextAlignment } from '../../types';

export const Container = styled.div<{
  textAlignment: CellTextAlignment;
  width?: string | number;
}>`
  padding: 10px 20px;
  text-align: ${(props) => props.textAlignment};
  box-sizing: border-box;

  ${({ width }) =>
    width &&
    css`
      width: ${width}${typeof width === 'number' && 'px'};
    `};
`;

export const StyledCell = styled.td<{
  isActive: boolean;
  width?: string | number;
}>`
  padding: 0;
  position: relative;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.gray[200]} 1px,
    transparent 1px,
    transparent 100%
  );

  &:last-of-type {
    background: none;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: none;
    `};
`;
