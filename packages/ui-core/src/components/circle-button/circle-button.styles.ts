import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ButtonVariant } from '../../types';

type Props = {
  isDisabled: boolean;
  variant?: ButtonVariant;
};

const buttonVariant = {
  prop: 'variant',
  variants: {
    secondary: {
      backgroundColor: colors.blue[500],
      borderColor: colors.blue[500],
      boxShadow: `0 2px 4px 0 ${transparentize(0.85, colors.black['500'])}`,
      '&:hover': {
        backgroundColor: colors.blue[400],
      },
    },
  },
};

export const StyledButton = styled.button<Props>`
  display: flex;
  text-decoration: none;

  border-radius: 50%;
  padding: 0;
  width: 37px;
  height: 37px;

  outline: none;
  border: none;
  cursor: pointer;

  align-items: center;
  justify-content: center;

  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.85;
      pointer-events: none;
    `}

  &:hover {
    text-decoration: none;
    box-shadow: 'none';
  }

  ${variant(buttonVariant)}
`;

export const IconSocket = styled.div`
  display: flex;
  align-items: center;
`;
