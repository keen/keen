import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const TabsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  width: 100%;
  position: relative;
  color: ${colors.green[500]};
`;

export const Tab = styled.div<{
  isActive: boolean;
}>`
  padding: 10px 20px;
  min-width: 0;
  text-align: center;
  cursor: pointer;
  background: linear-gradient(currentColor 0 0) bottom / var(--d, 0) 2px
    no-repeat;
  transition: background 150ms ease-out;

  &:hover {
    background-color: ${transparentize(0.9, colors.green[100])};
  }

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }

  ${(props) =>
    props.isActive &&
    css`
      --d: 100%;
    `};
`;
