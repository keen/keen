import styled, { css } from 'styled-components';
import { Position } from '@keen.io/ui-core';

export const LegendContainer = styled.div<{
  position: Position;
}>`
  display: flex;
  min-height: 0;
  min-width: 0;
  flex-direction: row;

  & > div:first-child {
    ${props =>
      (props.position === 'top' || props.position === 'bottom') &&
      css`
        margin-right: 20px;
      `}
    ${props =>
      (props.position === 'left' || props.position === 'right') &&
      css`
        margin-bottom: 20px;
      `}
  }

  ${props =>
    (props.position === 'left' || props.position === 'right') &&
    css`
      flex-direction: column;
      align-items: center;
    `}
`;
