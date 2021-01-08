import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ButtonAction } from './types';

type ButtonProps = {
  isDisabled?: boolean;
  borderRadius?: string;
  background?: string;
  backgroundHover?: string;
};

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  text-decoration: none;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '4px'};
  background-color: ${(props) =>
    props.background
      ? props.background
      : transparentize(0.85, colors.blue['100'])};
  padding: 5px 11px;
  width: 37px;
  height: 37px;
  outline: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  &:hover {
    text-decoration: none;
    background-color: ${(props) =>
      props.backgroundHover
        ? props.backgroundHover
        : transparentize(0.75, colors.blue['100'])};
  }
`;

type IconProps = {
  action: ButtonAction;
};

export const StyledIcon = styled.span<IconProps>`
  font-family: 'Lato Regular', sans-serif;
  font-size: 25px;
  line-height: 30px;

  ${(props) =>
    props.action === 'create' &&
    css`
      color: ${colors.green['500']};
    `}
  ${(props) =>
    props.action === 'remove' &&
    css`
      color: ${colors.red['200']};
    `}
`;
