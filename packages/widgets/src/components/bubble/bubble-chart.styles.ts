import styled, { css } from 'styled-components';
import { Position } from '@keen.io/ui-core';

export const LegendContainer = styled.div<{
  position: Position;
  maxHeight: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  ${props =>
    (props.position === 'left' || props.position === 'right') &&
    css`
      & > div {
        max-height: ${props.maxHeight}%;
        margin-bottom: 20px;
      }
    `}
  ${props =>
    (props.position === 'top' || props.position === 'bottom') &&
    css`
      & > div {
        max-width: 80%;
        margin-right: 20px;
      }

      flex-direction: row;
      width: 100%;
      height: 100%;
    `}
`;
