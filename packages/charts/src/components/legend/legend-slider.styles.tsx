import styled, { css } from 'styled-components';

import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

export type Variant = 'vertical' | 'horizontal';

type SliderMode = 'vertical' | 'horizontal';

export const VERTICAL_BUTTON_HEIGHT = 34;

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
}>`
  position: absolute;
  ${props => positionMixin(props.position)}

  display: flex;
  justify-content: center;
  align-items: center;
  ${props => dimensionMixin(props.variant)}

  svg {
    fill: ${props => (props.disabled ? colors.white[300] : colors.blue[100])}
  }

  ${props =>
    !props.disabled &&
    css`
      cursor: pointer;
      &:hover {
        background: ${colors.white['400']};
      }
    `}

   transition: all .2s linear;
  }
`;

export const Wrapper = styled.div<{
  sliderMode: SliderMode;
}>`
  padding: ${props =>
    props.sliderMode === 'horizontal' ? '0 10px' : '10px 0px'};

  .slick-vertical .slick-slide {
    border: none;
  }
`;

export const Layout = styled.div<{
  sliderMode: SliderMode;
}>`
  position: relative;
  padding: ${props =>
    props.sliderMode === 'horizontal' ? '15px 34px' : '34px 15px'};
`;
