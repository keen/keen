import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ButtonVariant, ButtonSize } from './types';

const themeVariants = {
  prop: 'variant',
  variants: {
    primary: {
      backgroundColor: colors.yellow['400'],
      borderColor: colors.yellow['400'],
      color: colors.black['500'],
      '&:focus': {
        boxShadow: `0 0 0 0.2rem rgba(218,165,80, .5)`,
      },
      '&:hover': {
        color: colors.black['400'],
        backgroundColor: colors.yellow['500'],
      },
    },
    secondary: {
      backgroundColor: colors.blue['500'],
      borderColor: colors.blue['500'],
      color: colors.white['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.blue['400'],
      },
    },
  },
};

const sizeVariants = {
  prop: 'size',
  variants: {
    default: {
      height: '42px',
    },
    large: {
      height: '48px',
    },
  },
};

const buttonMixin = () => css`
  font-size: 15px;
  font-family: 'Lato Bold', sans-serif;
  text-decoration: none;

  border-radius: 22.5px;
  padding: 0 25px;

  outline: none;
  border: none;
  cursor: pointer;

  align-items: center;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
`;

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  isDisabled: boolean;
}>`
  display: flex;
  ${buttonMixin()};
  ${variant(themeVariants)};
  ${variant(sizeVariants)};
`;

export const StyledAnchor = styled.a<{
  variant: ButtonVariant;
  size: ButtonSize;
  isDisabled: boolean;
}>`
  display: inline-flex;
  ${buttonMixin()}
  ${variant(themeVariants)}
  ${variant(sizeVariants)};
`;

export const IconSocket = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;
