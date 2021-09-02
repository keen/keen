import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

import { CellTextAlignment } from './types';

export const StyledCell = styled.td<{ disableBorder?: boolean }>`
  padding: 0;
  border-right: 1px solid ${colors.gray[200]};
  position: relative;

  &:last-of-type {
    border-right: none;
  }

  ${({ disableBorder }) =>
    disableBorder &&
    css`
      border: 0;
    `};
`;

export const Container = styled.div<{
  textAlignment: CellTextAlignment;
}>`
  padding: 15px;
  text-align: ${(props) => props.textAlignment};
`;
