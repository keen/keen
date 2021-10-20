import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';

export const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export const TableScrollWrapper = styled.div`
  width: 100%;
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
`;
