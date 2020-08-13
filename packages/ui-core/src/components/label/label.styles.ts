import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { LabelVariant } from './types';

const labelVariants = {
  prop: 'variant',
  variants: {
    primary: {
      color: colors.blue[500],
      fontFamily: 'Lato Regular, sans-serif',
      lineHeight: '16px',
    },
    secondary: {
      display: 'inline-block',
      color: colors.black[100],
      fontFamily: 'Lato Bold, sans-serif',
      lineHeight: '17px',
      marginBottom: '3px',
    },
  },
};

export const StyledLabel = styled.label<{
  hasError?: boolean;
  disabled?: boolean;
  variant: LabelVariant;
}>`
  font-size: 14px;
  ${variant(labelVariants)}

  ${props =>
    props.disabled &&
    props.variant === 'secondary' &&
    css`
      color: ${transparentize(0.5, colors.black[100])};
      cursor: not-allowed;
    `};

  ${props =>
    props.disabled &&
    props.variant === 'primary' &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.red[500]};
    `}
`;

export const Asterisk = styled.span`
  color: ${colors.red[500]};
`;
