import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ButtonVariant, ButtonSize, ButtonType } from './types';

const createOutlineButton = (baseColor: string) => ({
  backgroundColor: colors.white['500'],
  border: `solid 1px ${baseColor}`,
  color: baseColor,
  boxShadow: `0 2px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
  '&:hover': {
    boxShadow: 'none',
    color: colors.white['500'],
    backgroundColor: baseColor,
  },
});

const outlineVariants = {
  prop: 'variant',
  variants: {
    primary: createOutlineButton(colors.yellow['400']),
    success: createOutlineButton(colors.green['300']),
    secondary: createOutlineButton(colors.blue['500']),
    danger: createOutlineButton(colors.red['500']),
  },
};

const solidVariants = {
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
      boxShadow: `0 2px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.blue['400'],
      },
    },
    danger: {
      backgroundColor: colors.red['300'],
      borderColor: colors.red['300'],
      color: colors.white['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.red['400'],
      },
    },
    success: {
      backgroundColor: colors.green['300'],
      borderColor: colors.green['300'],
      color: colors.white['500'],
      boxShadow: `0 1px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        boxShadow: 'none',
        backgroundColor: colors.green['400'],
      },
    },
  },
};

const sizeVariants = {
  prop: 'size',
  variants: {
    default: {
      height: '37px',
    },
    large: {
      height: '45px',
    },
  },
};

const buttonMixin = () => css`
  font-size: 15px;
  font-family: 'Lato Bold', sans-serif;
  text-decoration: none;

  border-radius: 25px;
  padding: 0 25px;

  outline: none;
  border: none;
  cursor: pointer;

  align-items: center;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
`;

type Props = {
  variant: ButtonVariant;
  body: ButtonType;
  size: ButtonSize;
  isDisabled: boolean;
};

export const StyledButton = styled.button<Props>`
  display: flex;
  ${buttonMixin()};
  ${props => props.body === 'solid' && variant(solidVariants)}
  ${props => props.body === 'outline' && variant(outlineVariants)}
  ${variant(sizeVariants)};
`;

export const StyledAnchor = styled.a<Props>`
  display: inline-flex;
  ${buttonMixin()}
  ${props => props.body === 'solid' && variant(solidVariants)}
  ${props => props.body === 'outline' && variant(outlineVariants)}
  ${variant(sizeVariants)};
`;

export const IconSocket = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;
