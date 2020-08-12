import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { InputVariant } from './types';

const inputVariants = {
  prop: 'variant',
  variants: {
    solid: {
      padding: '10px 14px',
      height: '37px',
      border: `1px solid ${transparentize(0.5, colors.black[500])}`,
      borderRadius: '4px',
      color: colors.blue[500],
      '&:focus': {
        boxShadow: '0 0 3px 1px rgba(119, 163, 187, 0.5)',
      },
      '&:disabled': {
        border: `1px solid ${transparentize(0.5, colors.blue[500])}`,
        background: colors.white[500],
      },
      '&:disabled::placeholder': {
        color: `${transparentize(0.6, colors.black[400])}`,
      },
    },
    outline: {
      height: '40px',
      padding: '0 16px',
      border: 'none',
      fontSize: '16px',
      lineHeight: '20px',
      borderBottom: `solid 1px ${colors.blue[400]}`,
      '&:focus': {
        background: transparentize(0.9, colors.blue[100]),
      },
      '&:disabled': {
        borderBottom: `solid 1px ${colors.gray[500]}`,
      },
    },
  },
};

export const Container = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  grid-template-columns: 1fr auto 8px;
  display: grid;
`;

export const Suffix = styled.div`
  display: flex;
  align-self: center;
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  grid-area: input;
  grid-column: 2;
`;

export const StyledInput = styled.input<{
  hasError: boolean;
  variant: InputVariant;
}>`
  width: 100%;

  box-sizing: border-box;
  grid-area: input;
  grid-column: 1 / span 3;

  font-family: 'Lato Regular', sans-serif;
  outline: none;
  font-weight: normal;

  ${variant(inputVariants)}

  ${props =>
    props.hasError &&
    props.variant === 'outline' &&
    css`
      border-bottom: solid 2px ${colors.red[500]};
    `}

  ${props =>
    props.hasError &&
    props.variant === 'solid' &&
    css`
      border-color: ${colors.red[500]};
    `}


  &::-webkit-credentials-auto-fill-button {
    display: none !important;
  }

  transition: background 0.1s linear;
`;
