import styled, { css } from 'styled-components';
import { Position } from '@keen.io/ui-core';

export const LegendContainer = styled.div<{
  position: Position;
}>`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;

  & > div:first-child {
    margin: 0 0 20px 0;
    ${props =>
      (props.position === 'top' || props.position === 'bottom') &&
      css`
        margin: 0 20px 0 0;
      `}
  }

  ${props =>
    (props.position === 'top' || props.position === 'bottom') &&
    css`
      flex-direction: row;
      width: 100%;
      height: 100%;
    `}
`;
