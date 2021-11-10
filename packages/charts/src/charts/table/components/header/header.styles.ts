import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { Typography } from '@keen.io/ui-core';

export const Head = styled.thead<{
  typography?: Typography;
  backgroundColor: string;
}>`
  ${(props) => props.typography};
  color: ${(props) => props.typography.fontColor};
  background: ${(props) => props.backgroundColor};
  position: sticky;
  top: -1px;
  z-index: 1;
`;

export const TableHeader = styled.th<{
  isActive?: boolean;
  isDisabled?: boolean;
}>`
  position: relative;
  cursor: pointer;
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
