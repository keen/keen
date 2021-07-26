import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

const getPosition = (position: Position) => css`
  ${position}: 0;
`;

export const setDimension = (variant: Variant, dimension: number) =>
  variant === 'vertical'
    ? css`
        width: ${dimension}px;
        height: 100%;

        top: 50%;
        transform: translateY(-50%);
      `
    : css`
        width: 100%;
        height: ${dimension}px;

        left: 50%;
        transform: translateX(-50%);
      `;

export const Gradient = styled(motion.div)<{
  transmition: string;
  dimension: number;
  variant: Variant;
}>`
  top: 0;
  position: absolute;

  ${(props) => setDimension(props.variant, props.dimension)};
  background-image: linear-gradient(
    ${(props) => props.transmition},
    ${colors.white['400']},
    ${colors.white['500']}
  );
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Block = styled.div<{
  position: Position;
  disabled: boolean;
  variant: Variant;
  shadow: string;
  dimension: number;
}>`
  position: absolute;
  ${(props) => getPosition(props.position)};

  background: ${colors.white['500']};
  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => setDimension(props.variant, props.dimension)};
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
      box-shadow: ${props.shadow};
    `}

   transition: background .2s linear;
  }
`;
