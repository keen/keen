import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { TabTypes } from './types';

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const tabVariants = {
  prop: 'type',
  variants: {
    default: {
      fontSize: 14,
    },
    large: {
      fontSize: 19,
    },
  },
};

export const Tab = styled.div<{
  type: TabTypes;
  isActive: boolean;
}>`
  ${variant(tabVariants)};
  padding: 10px 20px;
  flex-grow: 1;
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.green[500]};
  text-align: center;
  cursor: pointer;
  background: linear-gradient(currentColor 0 0) bottom / var(--d, 0) 2px
    no-repeat;
  transition: background 150ms ease-out;

  &:hover {
    background-color: ${transparentize(0.9, colors.green[100])};
  }

  ${(props) =>
    props.isActive &&
    css`
      --d: 100%;
    `}
`;
