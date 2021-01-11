import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

import { Layout } from '../../types';

const POSITION_ALIGN = '0.5px';

export const Container = styled.div<{
  layout: Layout;
}>`
  position: relative;

  ${(props) =>
    props.layout === 'horizontal' &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.layout === 'vertical' &&
    css`
      height: 100%;
    `}
`;

export const PositionContainer = styled.div<{
  position: string;
  type: Layout;
  pointer: boolean;
}>`
  position: absolute;
  cursor: ${(props) => props.pointer && 'pointer'};

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      left: ${props.position};
      transform: translateX(-50%);
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      top: ${props.position};
      transform: translateY(-50%);
    `}
`;

export const Tick = styled.div<{
  type: Layout;
  position: string;
}>`
  position: absolute;
  background: ${colors.black['100']};

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      top: 0;
      left: calc(${props.position} - ${POSITION_ALIGN});
      width: 1px;
      height: 5px;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      top: calc(${props.position} - ${POSITION_ALIGN});
      left: 0;
      width: 5px;
      height: 1px;
    `}
`;

export const Label = styled.div<{
  type: Layout;
}>`
  font-size: 12px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black['100']};

  ${(props) =>
    props.type === 'horizontal' &&
    css`
      text-align: center;
      margin-top: 10px;
    `}

  ${(props) =>
    props.type === 'vertical' &&
    css`
      text-align: left;
      margin-left: 10px;
    `}
`;
