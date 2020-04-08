import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';

import { ButtonVariant } from './types';

const buttonVariants = {
  prop: 'variant',
  variants: {
    primary: {
      backgroundColor: colors.yellow['400'],
      borderColor: colors.yellow['400'],
      color: colors.blue['500'],
      '&:focus': {
        boxShadow: `0 0 0 0.2rem rgba(218,165,80, .5)`,
      },
      '&:hover': {
        color: colors.black['400'],
        backgroundColor: colors.yellow['500'],
      },
    },
  },
};

const buttonMixin = () => css`
  font-size: 16px;
  line-height: 19px;
  font-family: 'Lato Bold', sans-serif;
  text-decoration: none;

  border-radius: 22.5px;
  padding: 0 25px;
  height: 42px;

  outline: none;
  border: none;
  cursor: pointer;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
`;

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  isDisabled: boolean;
}>`
  ${buttonMixin()}
  ${variant(buttonVariants)}
`;

export const StyledAnchor = styled.a<{
  variant: ButtonVariant;
  isDisabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  ${buttonMixin()}
  ${variant(buttonVariants)}
`;
