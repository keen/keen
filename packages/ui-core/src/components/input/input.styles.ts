import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { InputVariant } from './types';

const inputVariants = {
  prop: 'variant',
  variants: {
    solid: {
      borderRadius: '4px',
      background: transparentize(0.95, colors.blue['100']),
      border: `solid 1px ${transparentize(0.85, colors.blue['100'])}`,
      '&:focus': {
        background: transparentize(0.9, colors.blue['100']),
      },
    },
    outline: {
      border: 'none',
      borderBottom: `solid 1px ${colors.blue['400']}`,
      '&:focus': {
        background: transparentize(0.9, colors.blue['100']),
      },
      '&:disabled': {
        borderBottom: `solid 1px ${colors.gray['500']}`,
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
  height: 40px;
  padding: 0 16px;

  box-sizing: border-box;
  grid-area: input;
  grid-column: 1 / span 3;

  font-family: 'Lato Regular', sans-serif;
  outline: none;

  font-size: 16px;
  line-height: 20px;
  font-weight: normal;

  ${variant(inputVariants)}

  ${props =>
    props.hasError &&
    props.variant === 'outline' &&
    css`
      border-bottom: solid 2px ${colors.orange['300']};
    `}

  ${props =>
    props.hasError &&
    props.variant === 'solid' &&
    css`
      border-color: ${colors.red['100']};
    `}


  &::-webkit-credentials-auto-fill-button {
    display: none !important;
  }

  transition: background 0.1s linear;
`;
