import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';

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
}>`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-bottom: solid 1px ${colors.blue['400']}
  box-sizing: border-box;
  grid-area: input;
  grid-column: 1 / span 3;

  font-family: 'Lato Regular', sans-serif;
  outline: none;

  font-size: 16px;
  line-height: 20px;
  font-weight: normal;

  ${props =>
    props.hasError &&
    css`
      border-bottom: solid 2px ${colors.orange['300']};
    `}

  &:focus {
    background: ${transparentize(0.9, colors.blue['100'])}
  }

  &:disabled {
    border-bottom: solid 1px ${colors.gray['500']}
  }

  &::-webkit-credentials-auto-fill-button {
    display: none !important;
  }

  transition: background .1s linear;
`;
