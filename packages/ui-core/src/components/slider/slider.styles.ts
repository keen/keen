import styled, { css } from 'styled-components';
import { Layout, Position } from '../../types';

export const TickContainer = styled.div<{
  left: number;
  controlSize: number;
  type: Layout;
  sliderThickness: number;
}>`
  position: absolute;
  width: 30px;

  ${props =>
    props.type === 'horizontal' &&
    css`
      top: ${props.controlSize / 2 + props.sliderThickness}px;
      left: ${props.left - 14.5}px;
    `}

  ${props =>
    props.type === 'vertical' &&
    css`
      left: ${props.controlSize / 2 + props.sliderThickness}px;
      top: ${props.left - props.controlSize / 2}px;
    `}
`;

export const Tick = styled.div<{
  type: Layout;
}>`
  position: absolute;
  background: #4f5b5f;

  ${props =>
    props.type === 'horizontal' &&
    css`
      top: 0px;
      left: 50%;
      width: 1px;
      height: 5px;
    `}

  ${props =>
    props.type === 'vertical' &&
    css`
      top: 50%;
      left: 0px;
      width: 5px;
      height: 1px;
    `}
`;

export const Label = styled.div<{
  type: Layout;
}>`
  font-family: Lato Regular;
  font-size: 12px;
  color: #4f5b5f;

  ${props =>
    props.type === 'horizontal' &&
    css`
      text-align: center;
      margin-top: 10px;
    `}

  ${props =>
    props.type === 'vertical' &&
    css`
      text-align: left;
      margin-left: 10px;
    `}
`;

export const ContainerTooltip = styled.div<{
  type: Position;
  size: number;
  width: number;
  height: number;
}>`
  position: absolute;
  font-family: Lato Regular;
  font-size: 12px;

  ${props =>
    props.type === 'top' &&
    css`
      bottom: ${props.size + 7}px;
      left: ${props.size / 2 - props.width / 2 - 3}px;
    `}

  ${props =>
    props.type === 'left' &&
    css`
      right: ${props.size + 7}px;
      top: ${props.size / 2 - props.height / 2 - 3}px;
    `}

  ${props =>
    props.type === 'right' &&
    css`
      left: ${props.size + 7}px;
      top: ${props.size / 2 - props.height / 2 - 3}px;
    `}

  ${props =>
    props.type === 'bottom' &&
    css`
      top: ${props.size + 7}px;
      left: ${props.size / 2 - props.width / 2 - 3}px;
    `}
`;
