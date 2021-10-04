import styled, { css, createGlobalStyle } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const GlobalStyle = createGlobalStyle`
  div[role='listitem']:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

export const ListItem = styled.div<{
  isActive?: boolean;
}>`
  padding: 7px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: ${transparentize(0.8, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.8, colors.green[100])};
    `};
`;
