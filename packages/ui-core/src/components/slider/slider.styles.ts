import styled, { css } from 'styled-components';
import { Position } from '../../types';

export const ContainerTooltip = styled.div<{
  type: Position;
  size: number;
  awidth: number;
  aheight: number;
}>`
  position: absolute;
  font-family: Lato Regular;
  font-size: 12px;

  ${props =>
    props.type === 'top' &&
    css`
      bottom: ${props.size + 7}px;
      left: ${props.size / 2 - props.awidth / 2}px;
    `}

  ${props =>
    props.type === 'left' &&
    css`
      right: ${props.size + 7}px;
      top: ${props.size / 2 - props.aheight / 2}px;
    `}

  ${props =>
    props.type === 'right' &&
    css`
      left: ${props.size + 7}px;
      top: ${props.size / 2 - props.aheight / 2}px;
    `}

  ${props =>
    props.type === 'bottom' &&
    css`
      top: ${props.size + 7}px;
      left: ${props.size / 2 - props.awidth / 2}px;
    `}
`;
