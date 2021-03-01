import styled from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

const alertVariants = {
  prop: 'type',
  variants: {
    success: {
      color: colors.green['500'],
      borderColor: colors.green['400'],
      background: transparentize(0.8, colors.green['100']),
    },
    error: {
      color: colors.red['500'],
      borderColor: colors.red['500'],
      background: transparentize(0.6, colors.red['100']),
    },
    info: {
      color: colors.blue['500'],
      borderColor: colors.blue['200'],
      background: transparentize(0.6, colors.lightBlue['300']),
    },
  },
};

export const StyledAlert = styled.div<{
  type: Variant;
}>`
  padding: 10px 20px;
  border-left: solid;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;

  ${variant(alertVariants)};
`;
