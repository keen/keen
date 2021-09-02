import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { Typography } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

export const Container = styled.tr<{
  typography: Typography;
}>`
  ${(props) => props.typography};
  color: ${(props) => props.typography.fontColor};
`;

export const StickyCell = styled.td<{
  backgroundColor: string;
  isActive?: boolean;
}>`
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${(props) => props.backgroundColor};
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

export const DisableInteractions = styled.div<{ disableInteraction: boolean }>`
  ${({ disableInteraction }) =>
    disableInteraction &&
    css`
      pointer-events: none;
    `};
`;
