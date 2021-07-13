import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const Menu = styled.ul`
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li<{ isActive?: boolean }>`
  height: 37px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.7, colors.green[100])};
      border-left: 4px solid;
      padding-left: 16px;
      border-color: ${colors.green[500]};
    `};
`;
