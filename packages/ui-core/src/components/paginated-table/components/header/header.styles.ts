import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { Typography } from '../../../../types';

export const Head = styled.thead<{
  typography?: Typography;
  backgroundColor: string;
}>`
  ${(props) => props.typography};
  color: ${(props) => props.typography.fontColor};
  background: ${(props) => props.backgroundColor};
`;

export const StyledTH = styled.th<{ isActive?: boolean }>`
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: ${transparentize(0.85, colors.green[300])};
      }
    `};
`;
