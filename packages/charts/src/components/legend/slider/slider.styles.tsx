import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Mode, Variant } from './types';

export const VERTICAL_BUTTON_HEIGHT = 34;

export const Slider = styled(motion.div)<{
  mode: Mode;
}>`
  display: grid;

  ${props =>
    props.mode === 'vertical' &&
    css`
      grid-gap: 10px 0;
      min-height: 0px;
    `}

  ${props =>
    props.mode === 'horizontal' &&
    css`
      grid-gap: 10px 20px;
      grid-auto-flow: column;
    `}
`;

export const ScrollMask = styled(motion.div)`
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SliderLayout = styled.div<{
  mode: Mode;
}>`
  position: relative;
  box-sizing: border-box;
  height: 100%;

  padding: ${props =>
    props.mode === 'horizontal' ? '15px 34px' : '34px 25px'};
`;

export const SliderItem = styled.div`
  & + & {
    margin-top: 8px;
  }
`;

export const SLIDER_ITEM_WIDTH = 100;

const positionMixin = (position: Position) => css`
  ${position}: 0;
`;

export const dimensionMixin = (variant: Variant) =>
  variant === 'vertical'
    ? css`
        width: 34px;
        height: 100%;

        top: 50%;
        transform: translateY(-50%);
      `
    : css`
        width: 100%;
        height: ${VERTICAL_BUTTON_HEIGHT}px;

        left: 50%;
        transform: translateX(-50%);
      `;

export const Button = styled.div<{
  position: Position;
  disabled: boolean;
  variant: Variant;
  gradientTransmition: string;
  shadow: string;
}>`
  position: absolute;
  ${props => positionMixin(props.position)}

  background: ${colors.white['500']}

  display: flex;
  justify-content: center;
  align-items: center;
  ${props => dimensionMixin(props.variant)}


  ${props =>
    !props.disabled &&
    css`
      cursor: pointer;
      box-shadow: ${props.shadow};
      &:hover {
        background-image: linear-gradient(
          ${props.gradientTransmition},
          ${colors.white['400']},
          ${colors.white['500']}
        );
      }
    `}

   transition: background .2s linear;
  }
`;
