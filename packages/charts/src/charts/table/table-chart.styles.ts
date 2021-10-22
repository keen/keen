import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';

export const TableContainer = styled.div<{
  footerHeight: number;
  isOverflow: boolean;
}>`
  width: 100%;
  overflow: scroll;

  ${({ footerHeight }) =>
    css`
      height: calc(100% - ${footerHeight}px);
    `};

  ${({ isOverflow }) =>
    isOverflow &&
    css`
      box-shadow: inset 0 -4px 8px -4px ${colors.gray['500']};
    `};
`;

export const TableScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const LeftOverflow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  left: -10px;
  box-shadow: 0 4px 8px ${colors.gray['500']};
`;

export const RightOverflow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  right: -10px;
  box-shadow: 0 -4px 8px ${colors.gray['500']};
`;

export const StyledCol = styled.col<{
  isHovered: boolean;
  isSelected: boolean;
}>`
  ${({ isHovered }) =>
    isHovered &&
    css`
      background-color: ${transparentize(0.85, colors.green[300])};
    `};

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${transparentize(0.85, colors.green[300])};
      border: 1px solid ${colors.green[500]};
    `};
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid transparent;
  width: 100%;
  margin: 0;
`;

export const TableFooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
