import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';

import { LabelVariant } from './types';

const labelVariants = {
  prop: 'variant',
  variants: {
    primary: {
      color: colors.blue[500],
    },
    secondary: {
      color: colors.black[500],
    },
  },
};

export const StyledLabel = styled.label<{
  hasError: boolean;
  disabled: boolean;
  variant: LabelVariant;
}>`
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 16px;
  ${variant(labelVariants)}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};

  ${props =>
    props.hasError &&
    css`
      color: ${colors.orange[300]};
    `}
`;
