import styled from 'styled-components';
import { variant, layout, LayoutProps } from 'styled-system';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

export const Container = styled.div<LayoutProps>`
  ${layout};
  vertical-align: middle;
  line-height: 1;
  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

const iconSocketVariants = {
  prop: 'type',
  variants: {
    primary: {
      bottom: '0',
    },
    secondary: {
      left: '1px',
      bottom: '0',
    },
    highlight: {
      left: '1px',
      bottom: '0',
    },
  },
};

export const IconSocket = styled(motion.div)<{
  type: Variant;
}>`
  position: absolute;
  height: 15px;
  line-height: 1;
  box-sizing: content-box;

  ${variant(iconSocketVariants)};
`;

const checkboxVariants = {
  prop: 'type',
  variants: {
    primary: {
      border: `solid 1px ${colors.blue['500']}`,
      borderRadius: '2px',
      width: '12px',
      height: '12px',
    },
    secondary: {
      border: `solid 1px ${transparentize(0.8, colors.blue['500'])}`,
      background: transparentize(0.95, colors.blue['100']),
      borderRadius: '4px',
      width: '15px',
      height: '15px',
    },
    highlight: {
      border: `solid 1px ${transparentize(0.8, colors.gray['100'])}`,
      background: transparentize(0.8, colors.white['400']),
      borderRadius: '4px',
      width: '15px',
      height: '15px',
    },
  },
};

const activeCheckboxVariants = {
  prop: 'type',
  variants: {
    primary: {},
    secondary: {},
    highlight: {
      border: `solid 1px ${transparentize(0.7, colors.gray['100'])}`,
      background: transparentize(0.25, colors.white['400']),
    },
  },
};

export const StyledCheckbox = styled.div<{
  checked: boolean;
  type: Variant;
}>`
  position: relative;
  display: inline-block;
  box-sizing: content-box;

  ${variant(checkboxVariants)};
  ${(props) => props.checked && variant(activeCheckboxVariants)}
`;

export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
