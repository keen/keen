import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { Mode } from './types';

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
