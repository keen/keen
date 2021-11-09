import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

import { CellTextAlignment } from '../../types';

export const CellContent = styled.div<{
  textAlignment: CellTextAlignment;
  width?: string | number;
}>`
  padding: 10px 20px;
  box-sizing: border-box;
  text-align: ${({ textAlignment }) => textAlignment};
  ${({ textAlignment }) =>
    textAlignment === 'right' &&
    css`
      margin-left: auto;
    `};

  ${({ width }) =>
    width &&
    css`
      width: ${width}${typeof width === 'number' && 'px'};
    `};
`;

export const CellContainer = styled.td<{
  isActive?: boolean;
  isDisabled?: boolean;
  width?: string | number;
}>`
  padding: 0;
  position: relative;
  cursor: pointer;
  background: linear-gradient(
    270deg,
    transparent 0%,
    ${colors.gray[200]} 1px,
    transparent 1px,
    transparent 100%
  );

  &:last-of-type {
    background: none;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background: ${colors.gray[500]};
      opacity: 0.4;
      cursor: not-allowed;
    `};

  ${({ isActive }) =>
    isActive &&
    css`
      background: none;
    `};

  overflow-wrap: break-word;
`;
