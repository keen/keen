import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { solidButtonVariants } from '../../theme';

import { ButtonSize, ButtonType } from './types';

import { ButtonVariant } from '../../types';

const createOutlineButton = (baseColor: string) => ({
  backgroundColor: 'transparent',
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

const activeVariants = {
  prop: 'variant',
  variants: {
    blank: {
      boxShadow: 'none',
      backgroundColor: transparentize(0.8, colors.blue['100']),
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

  &:hover {
    text-decoration: none;
  }
`;

type Props = {
  variant: ButtonVariant;
  body: ButtonType;
  size: ButtonSize;
  isDisabled: boolean;
  isActive: boolean;
  fullWidth?: boolean;
};

export const StyledButton = styled.button<Props>`
  display: flex;
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
  ${buttonMixin()};
  ${props => props.body === 'solid' && variant(solidButtonVariants)}
  ${props => props.body === 'outline' && variant(outlineVariants)}
  ${props => props.isActive && variant(activeVariants)}
  ${variant(sizeVariants)};
`;

export const StyledAnchor = styled.a<Props>`
  display: inline-flex;
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
    `}
  ${buttonMixin()}
  ${props => props.body === 'solid' && variant(solidButtonVariants)}
  ${props => props.body === 'outline' && variant(outlineVariants)}
  ${variant(sizeVariants)};
`;

export const IconSocket = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;
