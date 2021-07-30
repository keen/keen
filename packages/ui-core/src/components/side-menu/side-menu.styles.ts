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
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background 150ms ease-out;

  &:last-child {
    margin-bottom: 0;
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.7, colors.green[100])};
      border-left: 4px solid;
      padding-left: 16px;
      border-color: ${colors.green[500]};
      box-shadow: 0 4px 8px 0 ${transparentize(0.85, colors.black[500])};
    `};

  ${(props) =>
    !props.isActive &&
    css`
      &:hover {
        background: ${transparentize(0.9, colors.green[100])};
      }
    `};
`;
