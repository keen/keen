import React, { FC, useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { ARROW_SIZE } from '../tooltip';

import { Position } from '../../types';

const ARROW_OFFSET = 4;
const TOOLTIP_ARROW_SIZE = ARROW_SIZE + ARROW_OFFSET;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
};

const PositionContainer = styled.div<{
  position: Position;
  containerSize: number;
  width: number;
  height: number;
}>`
  position: absolute;
  top: 0;
  left: 0;

  ${(props) =>
    props.position === 'left' &&
    css`
      transform: translateX(-50%)
        translateX(-${props.width / 2 + TOOLTIP_ARROW_SIZE}px) translateY(-50%)
        translateY(${props.containerSize / 2}px);
    `};

  ${(props) =>
    props.position === 'right' &&
    css`
      transform: translateX(-50%)
        translateX(
          ${props.width / 2 + props.containerSize + TOOLTIP_ARROW_SIZE}px
        )
        translateY(-50%) translateY(${props.containerSize / 2}px);
    `};

  ${(props) =>
    props.position === 'bottom' &&
    css`
      transform: translateX(-50%) translateX(${props.containerSize / 2}px)
        translateY(-50%)
        translateY(
          ${props.containerSize + props.height / 2 + TOOLTIP_ARROW_SIZE}px
        );
    `};

  ${(props) =>
    props.position === 'top' &&
    css`
      transform: translateX(-50%) translateX(${props.containerSize / 2}px)
        translateY(-50%) translateY(-${props.height / 2 + TOOLTIP_ARROW_SIZE}px);
    `};
`;

type Props = {
  children: React.ReactNode;
  containerSize: number;
  x: number;
  y: number;
  visible: boolean;
  position: Position;
};

const TooltipPosition: FC<Props> = ({
  children,
  x,
  y,
  containerSize,
  visible,
  position,
}) => {
  const element = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { width, height } = element.current.getBoundingClientRect();
    setState({
      width,
      height,
    });
  }, [element.current, visible, position, x, y]);

  return (
    <PositionContainer
      ref={element}
      position={position}
      containerSize={containerSize}
      width={state.width}
      height={state.height}
    >
      {children}
    </PositionContainer>
  );
};

export default TooltipPosition;
